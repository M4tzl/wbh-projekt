package com.github.dmn1k.wbhprojekt.todo;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Hieraus macht Spring Data JPA automatisch ein JPA-Repository mit Standard-CRUD-Methoden
 */
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
}
