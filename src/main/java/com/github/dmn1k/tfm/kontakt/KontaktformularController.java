package com.github.dmn1k.tfm.kontakt;

import com.github.dmn1k.tfm.inserate.Inserat;
import com.github.dmn1k.tfm.inserate.InserateRepository;
import com.github.dmn1k.tfm.mail.Email;
import com.github.dmn1k.tfm.mail.EmailService;
import com.github.dmn1k.tfm.security.Account;
import com.github.dmn1k.tfm.security.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.MessageFormat;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class KontaktformularController {
    private final InserateRepository inserateRepository;
    private final AccountRepository accountRepository;
    private final EmailService emailService;

    @PostMapping("/api/kontaktformular")
    public ResponseEntity<?> send(@RequestBody Kontaktformular kontaktformular) {
        User user = getLoggedInUser()
            .filter(u -> accountRepository.findByUsername(u.getUsername())
                .map(Account::isEnabled).isPresent())
            .orElseThrow(() -> new IllegalStateException("Kontaktformulare können nur von angemeldeten und aktivierten Nutzern versendet werden"));

        Inserat inserat = inserateRepository.findById(kontaktformular.getInseratId())
            .map(i -> new AccountAndInserat(accountRepository.findByUsername(i.getVermittler()), i))
            .filter(aui -> aui.getAccount().filter(Account::isEnabled).isPresent())
            .map(AccountAndInserat::getInserat)
            .orElseThrow(() -> new IllegalStateException("Kontaktformulare können nur an bestätigte Vermittler versendet werden"));

        String message = buildMessage(kontaktformular, user, inserat);

        emailService.send(Email.builder()
            .toAddress(inserat.getVermittler())
            .subject(MessageFormat.format("Anfrage zu Ihrem Inserat (Rufname: {0})", inserat.getRufname()))
            .content(message)
            .build());

        return ResponseEntity.ok().build();
    }

    private String buildMessage(Kontaktformular kontaktformular, User user, Inserat inserat) {
        return new StringBuilder()
                .append("Guten Tag, <br/>")
                .append(MessageFormat.format("der Nutzer {0} kontaktiert Sie zu Ihrem Inserat mit ID {1} (Rufname {2}): <br /><br />", user.getUsername(), inserat.getId(), inserat.getRufname()))
                .append("<strong>Allgemeine, freiwillige Angaben:</strong></br>")
                .append("<ul>")
                .append(MessageFormat.format("<li>Hat Erfahrung mit Hunden: {0}</li>", formatBoolean(kontaktformular.isErfahrungHund())))
                .append(MessageFormat.format("<li>Gibt es weitere Tiere im Haushalt: {0}</li>", formatBoolean(kontaktformular.isWeitereTiere())))
                .append(MessageFormat.format("<li>Gibt es Kinder im Haushalt: {0}</li>", formatBoolean(kontaktformular.isKinderHaushalt())))
                .append("</ul>")
                .append("<br /><br />")
                .append("<strong>Freiwillige Angaben zur Wohnsituation:</strong></br>")
                .append("<ul>")
                .append(MessageFormat.format("<li>Haus: {0}</li>", formatBoolean(kontaktformular.isHaus())))
                .append(MessageFormat.format("<li>Wohnung: {0}</li>", formatBoolean(kontaktformular.isWohnung())))
                .append(MessageFormat.format("<li>Tierhaltung ist erlaubt (z.B. vom Vermieter): {0}</li>", formatBoolean(kontaktformular.isTierhaltung())))
                .append("</ul>")
                .append("<br /><br />")
                .append("<strong>Nachricht:</strong></br>")
                .append(kontaktformular.getNachricht())
                .toString();
    }

    private static String formatBoolean(Boolean input){
        return Boolean.TRUE.equals(input) ? "Ja" : "Nein bzw. keine Angabe";
    }

    private Optional<User> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

    @Value
    private static class AccountAndInserat {
        private Optional<Account> account;
        private Inserat inserat;
    }
}
