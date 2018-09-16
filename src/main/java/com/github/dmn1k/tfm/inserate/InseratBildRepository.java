package com.github.dmn1k.tfm.inserate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface InseratBildRepository extends JpaRepository<InseratBild, Long> {
    List<InseratBild> findByInseratIdOrderByIdAsc(@Param("inseratId") long inseratId);
    Optional<InseratBild> findFirstByInseratIdOrderByIdAsc(@Param("inseratId") long inseratId);
}
