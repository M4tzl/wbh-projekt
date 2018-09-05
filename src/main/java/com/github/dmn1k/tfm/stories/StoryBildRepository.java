package com.github.dmn1k.tfm.stories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported = false)
public interface StoryBildRepository extends JpaRepository<StoryBild, Long> {
    List<StoryBild> findByStoryId(@Param("storyId") long storyId);
}
