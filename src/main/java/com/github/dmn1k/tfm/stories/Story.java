package com.github.dmn1k.tfm.stories;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.dmn1k.tfm.inserate.Inserat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @NotFound
    @OneToOne
    @JoinColumn(name = "inserat_id")
    private Inserat inserat;

    @Email
    private String autor;

    private String titel;
    private String beschreibung;
}
