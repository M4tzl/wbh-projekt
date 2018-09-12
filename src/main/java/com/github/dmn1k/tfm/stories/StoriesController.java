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
        BooleanExpression compositePredicate = QStory.story.draft.isFalse().and(predicate);
        Page<StoryDto> storyDtos = storiesRepository.findAll(compositePredicate, pageable)
            .map(Story::toDto);

        return ResponseEntity.ok(storyDtos);
    }

    @GetMapping("/api/stories/open")
    public ResponseEntity<?> loadOpenStories(Pageable pageable) {
        User user = getLoggedInUser().orElseThrow(() -> new IllegalStateException("Anonymous access not allowed"));

        Page<StoryDto> storyDtos = inserateRepository.findInserateWithoutStory(pageable)
            .map(i -> i.getStory() == null ? Story.builder()
                .inserat(i)
                .autor(user.getUsername())
                .titel("Story über " + i.getRufname())
                .build() : i.getStory())
            .map(Story::toDto);
        return ResponseEntity.ok(storyDtos);
    }

    @GetMapping("/api/stories/{id}")
    public ResponseEntity<?> loadStory(@PathVariable long id) {
        return storiesRepository.findById(id)
            .map(Story::toDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/api/stories")
    public ResponseEntity<?> createStory(@RequestBody StoryDto dto) {
        return saveStory(dto, dto.getId());
    }

    @PutMapping("/api/stories/{id}")
    public ResponseEntity<?> updateStory(@PathVariable long id,
                                         @RequestBody StoryDto dto) {
        return saveStory(dto, id);
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

    private ResponseEntity<?> saveStory(@RequestBody StoryDto dto, Long id) {
        User user = getLoggedInUser().orElseThrow(() -> new IllegalStateException("Anonymous access not allowed"));

        if(dto.getInseratId() == null){
            throw new IllegalArgumentException("Eine Story muss an einem Inserat hängen!");
        }

        Story story = Story.builder()
            .id(id)
            .titel(dto.getTitel())
            .beschreibung(dto.getBeschreibung())
            .autor(user.getUsername())
            .inserat(inserateRepository.getOne(dto.getInseratId()))
            .draft(dto.isDraft())
            .build();

        Story saved = storiesRepository.save(story);
        return ResponseEntity.ok(saved);
    }

    private Optional<User> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof User)) {
            return Optional.empty();
        }

        return Optional.of((User) principal);
    }

}
