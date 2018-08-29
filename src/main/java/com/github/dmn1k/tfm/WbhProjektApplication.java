package com.github.dmn1k.tfm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@SpringBootApplication
public class WbhProjektApplication {

    public static void main(String[] args) {
        SpringApplication.run(WbhProjektApplication.class, args);
    }
}
