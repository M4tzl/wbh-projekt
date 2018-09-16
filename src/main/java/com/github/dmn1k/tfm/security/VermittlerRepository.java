package com.github.dmn1k.tfm.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface VermittlerRepository extends JpaRepository<Vermittler, Long> {
    Optional<Vermittler> findByUsername(@Param("username") String username);
}
