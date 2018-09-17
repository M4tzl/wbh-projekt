package com.github.dmn1k.tfm.stories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface StoryBildRepository extends JpaRepository<StoryBild, Long> {
    List<StoryBild> findByStoryIdOrderByIdAsc(@Param("storyId") long storyId);
    Optional<StoryBild> findFirstByStoryIdOrderByIdAsc(@Param("storyId") long storyId);
}
