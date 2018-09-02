package com.github.dmn1k.tfm.inserate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
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

    private LocalDate lastUpdate;

    @OneToOne
    @JoinColumn(name = "rasse_id")
    private Rasse rasse;

    @Enumerated(EnumType.STRING)
    private InseratStatus status;

    private String rufname;
    private String rassenFreitext;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    private LocalDate geburtsdatum;

    private String kurzbeschreibung;

    @OneToOne
    @JoinColumn(name = "schulterhoehe_id")
    private Schulterhoehe schulterhoehe;

    @OneToOne
    @JoinColumn(name = "voraussichtliche_schulterhoehe_id")
    private Schulterhoehe voraussichtlicheSchulterhoehe;

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
}
