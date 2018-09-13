package com.github.dmn1k.tfm.security;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Pattern;

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

    @Email
    @Length(max = 100)
    private String username;

    @Length(max = 100)
    private String ansprechpartner;

    @Length(max = 100)
    private String organisation;

    @Length(max = 100)
    private String strasseHsNr;

    @Pattern(regexp = "[0-9]{5}")
    private String plz;

    @Length(max = 100)
    private String ort;

    private String bundesland;

    @Length(max = 20)
    @Pattern(regexp = "^[0-9-+/\\ss()]*$")
    private String telefon;

    @Length(max = 100)
    @Pattern(regexp = "^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$")
    private String webseite;
}
