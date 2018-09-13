package com.github.dmn1k.tfm.stories;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.dmn1k.tfm.inserate.Inserat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.validator.constraints.Length;

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

    @Length(max = 50)
    private String titel;

    private String beschreibung;
    private boolean draft;

    public StoryDto toDto(){
        return StoryDto.builder()
            .id(id)
            .autor(autor)
            .beschreibung(beschreibung)
            .titel(titel)
            .inseratId(inserat == null ? null : inserat.getId())
            .draft(draft)
            .build();
    }
}
