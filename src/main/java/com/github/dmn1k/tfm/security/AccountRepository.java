package com.github.dmn1k.tfm.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(@Param("username") String username);
}
