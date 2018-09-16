package com.github.dmn1k.tfm.stories;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Builder(toBuilder = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoryBild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    private LocalDate created = LocalDate.now();

    private Long storyId;
    private String bildKey;
}
