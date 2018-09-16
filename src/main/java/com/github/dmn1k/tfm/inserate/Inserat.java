package com.github.dmn1k.tfm.inserate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.dmn1k.tfm.stories.Story;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.NotFound;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.EnumSet;

@Builder(toBuilder = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inserat {
    private static final DateTimeFormatter DATUM_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate created = LocalDate.now();

    @Builder.Default
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate lastUpdate = LocalDate.now();

    private String rasse;

    @Enumerated(EnumType.STRING)
    private InseratStatus status;

    @Length(max = 20)
    private String rufname;
    private String rassenFreitext;

    private String bundesland;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    @Past
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate geburtsdatum;

    private String kurzbeschreibung;

    private String schulterhoehe;
    private String voraussichtlicheSchulterhoehe;

    @Length(max = 100)
    @Email
    private String storyschreiber;

    private boolean kastriert;
    private boolean gechipt;
    private boolean geimpft;
    private boolean stubenrein;
    private boolean leinenfuehrigkeit;
    private boolean autofahren;
    private boolean vertraeglichkeitKinder;
    private boolean vertraeglichkeitKatzen;
    private boolean vertraeglichkeitHunde;
    private boolean zutraulich;

    private boolean zielgruppeAnfaenger;
    private boolean zielgruppeSenioren;
    private boolean zielgruppeGarten;
    private boolean zielgruppeErfahren;
    private boolean zielgruppeFamilien;
    private String vermittler;

    private String plz;
    private String ort;
    private String organisation;

    @JsonIgnore
    @NotFound
    @OneToOne(mappedBy = "inserat")
    private Story story;

    @Transient
    public boolean isAktivierbar() {
        return EnumSet.of(InseratStatus.INAKTIV, InseratStatus.ENTWURF).contains(status);
    }

    @Transient
    public boolean isDeaktivierbar() {
        return InseratStatus.AKTIV.equals(status);
    }

    @Transient
    public boolean isVermittelbar() {
        return EnumSet.of(InseratStatus.AKTIV, InseratStatus.VERMITTELT).contains(status);
    }

    @Transient
    public boolean isLoeschbar() {
        return !EnumSet.of(InseratStatus.VERMITTELT, InseratStatus.IN_RECHNUNG_GESTELLT).contains(status);
    }

    @Transient
    public boolean isEditierbar() {
        return !EnumSet.of(InseratStatus.VERMITTELT, InseratStatus.IN_RECHNUNG_GESTELLT).contains(status);
    }

    @Formula("date_part('day', now() - geburtsdatum)")
    private int alter;

    @Transient
    public String getFormattedAlter() {
        // Ungenauigkeiten durch nicht gleichlange Monate/Jahre werden in Kauf genommen.
        if (getAlter() == 1) {
            return "1 Tag";
        } else if (getAlter() < 7) {
            return getAlter() + " Tage";
        } else if ((getAlter() / 7) == 1) {
            return "1 Woche";
        } else if (getAlter() < 30) {
            return (getAlter() / 7) + " Wochen";
        } else if ((getAlter() / 30) == 1) {
            return "1 Monat";
        } else if (getAlter() < 365) {
            return (getAlter() / 30) + " Monate";
        } else if ((getAlter() / 365) == 1) {
            return "1 Jahr";
        } else {
            return (getAlter() / 365) + " Jahre";
        }
    }

    public InseratUebersicht toUebersicht() {
        return InseratUebersicht.builder()
            .id(id)
            .lastUpdate(DATUM_FORMATTER.format(lastUpdate))
            .rufname(rufname)
            .rasse(rasse)
            .alter(getFormattedAlter())
            .plz(plz)
            .ort(ort)
            .status(status)
            .vermittler(vermittler)
            .aktivierbar(isAktivierbar())
            .deaktivierbar(isDeaktivierbar())
            .vermittelbar(isVermittelbar())
            .loeschbar(isLoeschbar())
            .editierbar(isEditierbar())
            .storyschreiber(storyschreiber)
            .build();
    }
}
