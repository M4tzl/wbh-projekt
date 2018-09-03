package com.github.dmn1k.tfm.inserate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(exported = false)
public interface InseratBildRepository extends JpaRepository<InseratBild, Long> {
    List<InseratBild> findByInseratId(@Param("inseratId") long inseratId);
}
