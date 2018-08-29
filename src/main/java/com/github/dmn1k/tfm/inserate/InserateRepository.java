package com.github.dmn1k.tfm.inserate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "inserate", path = "inserate")
public interface InserateRepository extends JpaRepository<Inserat, Long> {
}
