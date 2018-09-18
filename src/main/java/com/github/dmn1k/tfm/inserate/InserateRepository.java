package com.github.dmn1k.tfm.inserate;

import com.querydsl.core.types.dsl.StringExpression;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface InserateRepository extends JpaRepository<Inserat, Long>,
    QuerydslPredicateExecutor<Inserat>, QuerydslBinderCustomizer<QInserat> {

    @Query("SELECT i FROM Inserat i WHERE i.storyschreiber = :storyschreiber AND NOT EXISTS(SELECT s FROM Story s WHERE s.inserat = i AND s.draft = false)")
    Page<Inserat> findInserateWithoutStory(@Param("storyschreiber") String storyschreiber, Pageable pageable);

    long countByVermittler(@Param("vermittler") String vermittler);

    @Override
    default void customize(QuerydslBindings bindings, QInserat root) {
        bindings.bind(root.rufname).first(StringExpression::containsIgnoreCase);
    }

}
