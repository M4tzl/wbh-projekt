package com.github.dmn1k.tfm.stories;

import com.github.dmn1k.tfm.inserate.InserateRepository;
import com.github.dmn1k.tfm.inserate.QInserat;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.sql.JPASQLQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@RestController
public class StoriesController {
    private final StoriesRepository storiesRepository;
    private final InserateRepository inserateRepository;

    @GetMapping("/api/stories")
    public @ResponseBody ResponseEntity<?> loadStories(@QuerydslPredicate(root = Story.class) Predicate predicate,
                                                        Pageable pageable) {
        return ResponseEntity.ok(storiesRepository.findAll(predicate, pageable));
    }

    @GetMapping("/api/stories/open")
    public ResponseEntity<?> loadOpenStories(Pageable pageable) {
        User user = getLoggedInUser().orElseThrow(() -> new IllegalStateException("Anonymous access not allowed"));

        Page<Story> stories = inserateRepository.findInserateWithoutStory(pageable)
            .map(i -> Story.builder()
                .inserat(i)
                .autor(user.getUsername())
                .titel("Story über " + i.getRufname())
                .build());
        return ResponseEntity.ok(stories);
    }

    @GetMapping("/api/stories/{id}")
    public ResponseEntity<?> loadStory(@PathVariable long id) {
        return storiesRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/stories")
    public ResponseEntity<?> createStory(@RequestBody Story story) {
        User user = getLoggedInUser().orElseThrow(() -> new IllegalStateException("Anonymous access not allowed"));
        Story updatedStory = story.toBuilder()
            .autor(user.getUsername())
            .build();

        Story saved = storiesRepository.save(updatedStory);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/api/stories/{id}")
    public ResponseEntity<?> updateStory(@PathVariable long id,
                                         @RequestBody Story story) {
        Story updatedStory = getLoggedInUser()
            .flatMap(u -> storiesRepository.findById(id)
                .filter(i -> i.getAutor().equals(u.getUsername())))
            .map(s -> story)
            .orElseThrow(() -> new IllegalStateException("Story existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        Story saved = storiesRepository.save(updatedStory);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/api/stories/{id}")
    public ResponseEntity<?> deleteStory(@PathVariable long id) {
        Story story = getLoggedInUser()
            .flatMap(u -> storiesRepository.findById(id)
                .filter(i -> i.getAutor().equals(u.getUsername())))
            .orElseThrow(() -> new IllegalStateException("Story existiert nicht bzw. der Zugriff ist nicht erlaubt"));

        storiesRepository.delete(story);
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
