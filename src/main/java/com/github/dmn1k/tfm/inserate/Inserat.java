package com.github.dmn1k.tfm.inserate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.EnumSet;

@Builder(toBuilder = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inserat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private LocalDate created = LocalDate.now();

    @Builder.Default
    private LocalDate lastUpdate = LocalDate.now();

    private String rasse;

    @Enumerated(EnumType.STRING)
    private InseratStatus status;

    private String rufname;
    private String rassenFreitext;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    private LocalDate geburtsdatum;

    private String kurzbeschreibung;

    private String schulterhoehe;
    private String voraussichtlicheSchulterhoehe;
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
        return InseratStatus.AKTIV.equals(status);
    }

    @Transient
    public boolean isLoeschbar() {
        return !InseratStatus.VERMITTELT.equals(status);
    }
}
