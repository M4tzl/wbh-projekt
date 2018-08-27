package com.github.dmn1k.tfm.infrastructure;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

// Wird von AWS verwendet um zu prüfen, ob Applikation noch läuft
@Controller
@RequestMapping("/health")
public class HealthCheckController {
    @GetMapping
    public ResponseEntity<?> health(){
        return ResponseEntity.ok("healthy");
    }
}
