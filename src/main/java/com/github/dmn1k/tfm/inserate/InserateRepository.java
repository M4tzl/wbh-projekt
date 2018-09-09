package com.github.dmn1k.tfm.inserate;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(exported = false)
public interface InserateRepository extends JpaRepository<Inserat, Long>,
    QuerydslPredicateExecutor<Inserat>, QuerydslBinderCustomizer<QInserat> {

    @Override
    default void customize(QuerydslBindings bindings, QInserat root) {
        bindings.bind(root.rufname).first(StringExpression::containsIgnoreCase);
    }

}
