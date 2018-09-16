package com.github.dmn1k.tfm.breeds;

import lombok.Cleanup;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class BreedsService {
    private static final List<String> BREEDS = new CopyOnWriteArrayList<>();

    private final ResourceLoader resourceLoader;

    @SneakyThrows
    @GetMapping("/api/breeds")
    public ResponseEntity<?> loadAll() {
        if(BREEDS.isEmpty()) {
            @Cleanup InputStream stream = resourceLoader.getResource("classpath:breeds.txt").getInputStream();
            @Cleanup InputStreamReader inputStreamReader = new InputStreamReader(stream, StandardCharsets.UTF_8);
            @Cleanup BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

            BREEDS.addAll(bufferedReader.lines().collect(Collectors.toList()));
        }

        return ResponseEntity.ok(BREEDS);
    }
}
