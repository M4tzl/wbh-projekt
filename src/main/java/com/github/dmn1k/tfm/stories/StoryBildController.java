package com.github.dmn1k.tfm.stories;

import com.github.dmn1k.tfm.images.ImageService;
import com.github.dmn1k.tfm.security.Role;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@RestController
public class StoryBildController {
    private final StoryBildRepository storyBildRepository;
    private final ImageService imageService;

    @SneakyThrows
    @RolesAllowed(Role.INTERESSENT_NAME)
    @PostMapping(value = "/api/stories/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {
        String key = imageService.upload(file);
        StoryBild storyBild = storyBildRepository.save(StoryBild.builder()
            .storyId(id)
            .bildKey(key)
            .build());

        return ResponseEntity.ok(storyBild);
    }

    @SneakyThrows
    @RolesAllowed(Role.INTERESSENT_NAME)
    @PutMapping(value = "/api/stories/{id}/images/{storyBildId}")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @PathVariable long storyBildId,
                                              @RequestParam("file") MultipartFile file) {

        StoryBild storyBild = storyBildRepository.findById(storyBildId)
            .orElseThrow(() -> new RuntimeException("StoryBild mit ID " + id + " nicht gefunden!"));

        String key = imageService.upload(file);
        storyBild.setBildKey(key);

        StoryBild updated = storyBildRepository.save(storyBild);
        return ResponseEntity.ok(updated);
    }

    @SneakyThrows
    @GetMapping("/api/stories/{id}/images/{bildKey}")
    public ResponseEntity<byte[]> serve(@PathVariable long id, @PathVariable String bildKey) {
        return imageService.download(bildKey);
    }

    @SneakyThrows
    @GetMapping("/api/stories/{id}/thumbnail")
    public ResponseEntity<byte[]> serveThumbnail(@PathVariable long id) {
        String bildKey = storyBildRepository.findFirstByStoryIdOrderByIdAsc(id)
            .map(StoryBild::getBildKey)
            .orElse("thumbnail-missing.png");

        return imageService.downloadThumbnail(bildKey);
    }

    @GetMapping("/api/stories/{id}/images")
    public ResponseEntity<List<StoryBild>> getImages(@PathVariable long id) {
        List<StoryBild> result = storyBildRepository.findByStoryIdOrderByIdAsc(id);

        return ResponseEntity.ok(result);
    }
}
