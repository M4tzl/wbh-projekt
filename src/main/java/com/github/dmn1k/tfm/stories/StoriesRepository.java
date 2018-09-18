package com.github.dmn1k.tfm.stories;

import com.querydsl.core.types.dsl.StringExpression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface StoriesRepository extends JpaRepository<Story, Long>,
    QuerydslPredicateExecutor<Story>, QuerydslBinderCustomizer<QStory> {

    long countStoriesByAutor(@Param("autor") String autor);

    @Override
    default void customize(QuerydslBindings bindings, QStory root) {
        bindings.bind(root.titel).first(StringExpression::containsIgnoreCase);
    }
}
