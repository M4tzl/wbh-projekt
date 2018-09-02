package com.github.dmn1k.tfm.inserate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(
    collectionResourceRel = "inserate",
    path = "inserate",
    excerptProjection = InseratExcerptProjection.class
)
public interface InserateRepository extends JpaRepository<Inserat, Long> {
    @RestResource(path="byRufname")
    Page<Inserat> findByRufnameIgnoreCaseContaining(@Param("rufname") String rufname, Pageable pageable);

}
