package com.github.dmn1k.tfm.stories;

import com.github.dmn1k.tfm.files.FileService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@RestController
public class StoryBildController {
    private final StoryBildRepository storyBildRepository;
    private final FileService fileService;

    @SneakyThrows
    @PostMapping(value = "/api/stories/{id}/images")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @RequestParam("file") MultipartFile file) {
        String key = fileService.upload(file);
        StoryBild storyBild = storyBildRepository.save(new StoryBild(null, id, key));

        return ResponseEntity.ok(storyBild);
    }

    @SneakyThrows
    @PutMapping(value = "/api/stories/{id}/images/{storyBildId}")
    public ResponseEntity<?> handleFileUpload(@PathVariable long id,
                                              @PathVariable long storyBildId,
                                              @RequestParam("file") MultipartFile file) {

        StoryBild storyBild = storyBildRepository.findById(storyBildId)
            .orElseThrow(() -> new RuntimeException("StoryBild mit ID " + id + " nicht gefunden!"));

        String key = fileService.upload(file);
        storyBild.setBildKey(key);

        StoryBild updated = storyBildRepository.save(storyBild);
        return ResponseEntity.ok(updated);
    }

    @SneakyThrows
    @GetMapping("/api/stories/{id}/images/{bildKey}")
    public @ResponseBody
    ResponseEntity<byte[]> serve(@PathVariable long id, @PathVariable String bildKey) {
        return fileService.download(bildKey);
    }

    @GetMapping("/api/stories/{id}/images")
    public @ResponseBody ResponseEntity<List<StoryBild>> getImages(@PathVariable long id) {
        List<StoryBild> result = storyBildRepository.findByStoryId(id);

        return ResponseEntity.ok(result);
    }
}
