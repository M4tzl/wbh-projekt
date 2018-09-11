package com.github.dmn1k.tfm.stories;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@RepositoryRestController
public class StoriesController {
    private final StoriesRepository repository;

    @GetMapping("/api/stories/{id}")
    public @ResponseBody ResponseEntity<?> loadStory(@PathVariable long id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/stories")
    public @ResponseBody ResponseEntity<?> createStory(@RequestBody Story story) {
        User user = getLoggedInUser().orElseThrow(() -> new IllegalStateException("Anonymous access not allowed"));
        Story updatedStory = story.toBuilder()
            .autor(user.getUsername())
            .build();

        Story saved = repository.save(updatedStory);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/stories/{id}")
    public @ResponseBody ResponseEntity<?> updateStory(@PathVariable long id,
                                                       @RequestBody Story story) {
        Story updatedStory = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getAutor().equals(u.getUsername())))
            .map(s -> story)
            .orElseThrow(() -> new IllegalStateException("Story existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        Story saved = repository.save(updatedStory);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/api/stories/{id}")
    public @ResponseBody ResponseEntity<?> deleteStory(@PathVariable long id) {
        Story story = getLoggedInUser()
            .flatMap(u -> repository.findById(id)
                .filter(i -> i.getAutor().equals(u.getUsername())))
            .orElseThrow(() -> new IllegalStateException("Story existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        repository.delete(story);
        return ResponseEntity.ok(story);
    }

    private Optional<User> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

}
