package com.github.dmn1k.tfm.inserate;

import lombok.*;


@Builder
@Value
public class InseratUebersicht {
    private Long id;
    private String lastUpdate;
    private String rufname;
    private String rasse;
    private String alter;
    private String plz;
    private String ort;
    private InseratStatus status;
    private String vermittler;

    private boolean aktivierbar;
    private boolean deaktivierbar;
    private boolean vermittelbar;
    private boolean loeschbar;
    private boolean editierbar;
}
