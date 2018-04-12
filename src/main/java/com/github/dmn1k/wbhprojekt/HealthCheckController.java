package com.github.dmn1k.wbhprojekt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/health")
public class HealthCheckController {
    private static final Logger LOGGER = LoggerFactory.getLogger(HealthCheckController.class);
    @GetMapping
    public ResponseEntity<?> health(){
        LOGGER.info("healthcheck yeah");
        return ResponseEntity.ok("healthy");
    }
}
