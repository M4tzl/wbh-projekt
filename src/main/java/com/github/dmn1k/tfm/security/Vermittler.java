package com.github.dmn1k.tfm.security;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "vermittler")
public class Vermittler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String ansprechpartner;
    private String organisation;
    private String strasseHsNr;
    private String plz;
    private String ort;
    private String bundesland;
    private String telefon;
    private String webseite;
}
