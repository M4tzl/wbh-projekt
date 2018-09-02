package com.github.dmn1k.tfm.stories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "stories", path = "stories")
public interface StoriesRepository extends JpaRepository<Story, Long> {
    @RestResource(path="byTitel")
    Page<Story> findByTitelIgnoreCaseContaining(@Param("titel") String titel, Pageable pageable);

}
