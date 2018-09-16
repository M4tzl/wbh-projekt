package com.github.dmn1k.tfm.kontakt;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class Kontaktformular {
    private long inseratId;
    private boolean erfahrungHund;
    private boolean weitereTiere;
    private boolean kinderHaushalt;
    private boolean haus;
    private boolean wohnung;
    private boolean tierhaltung;
    private String nachricht;
}
