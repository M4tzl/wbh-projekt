package com.github.dmn1k.tfm.security;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(@Param("username") String username);
    Page<Account> findByUsernameIgnoreCaseContainingAndIdNot(@Param("username") String username,
                                                             @Param("id") Long id,
                                                             Pageable pageable);
}
