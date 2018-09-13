package com.github.dmn1k.tfm.inserate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.dmn1k.tfm.stories.Story;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
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

    @Length(max = 20)
    private String rufname;
    private String rassenFreitext;

    private String bundesland;

    @Enumerated(EnumType.STRING)
    private Geschlecht geschlecht;

    @Past
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
        return !InseratStatus.VERMITTELT.equals(status);
    }

    @Transient
    public boolean isEditierbar() {
        return !EnumSet.of(InseratStatus.VERMITTELT, InseratStatus.IN_RECHNUNG_GESTELLT).contains(status);
    }
}
