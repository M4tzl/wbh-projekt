package com.github.dmn1k.tfm.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("!prod")
@Service
@Slf4j
public class LoggingEmailService implements EmailService {
    @Override
    public void send(Email email) {
        log.info("Die Anwendung läuft nicht auf AWS => Es werden keine Mails versandt");
        log.info(email.toString());
    }
}
