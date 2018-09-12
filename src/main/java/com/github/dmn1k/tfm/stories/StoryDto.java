package com.github.dmn1k.tfm.stories;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StoryDto {
    private Long id;
    private Long inseratId;
    private String autor;
    private String titel;
    private String beschreibung;
    private boolean draft;
}
