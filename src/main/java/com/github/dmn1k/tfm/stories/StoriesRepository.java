package com.github.dmn1k.tfm.stories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "stories", path = "stories")
public interface StoriesRepository extends JpaRepository<Story, Long> {
}
