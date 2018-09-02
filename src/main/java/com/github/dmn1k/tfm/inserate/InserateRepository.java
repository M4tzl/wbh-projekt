package com.github.dmn1k.tfm.inserate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(
    collectionResourceRel = "inserate",
    path = "inserate",
    excerptProjection = InseratExcerptProjection.class
)
public interface InserateRepository extends JpaRepository<Inserat, Long> {
    @RestResource(path = "rassen", rel = "rassen")
    @Query("SELECT r FROM Rasse r")
    List<Rasse> findRassen();

    @RestResource(path = "schulterhoehen", rel = "schulterhoehen")
    @Query("SELECT s FROM Schulterhoehe s")
    List<Schulterhoehe> findSchulterhoehen();
}
