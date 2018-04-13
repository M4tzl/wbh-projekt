package com.github.dmn1k.wbhprojekt;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/health")
public class HealthCheckController {
    @GetMapping
    public ResponseEntity<?> health(){
        LoggerFactory.getLogger(HealthCheckController.class).warn("So beautiful");
        return ResponseEntity.ok("healthy");
    }
}
