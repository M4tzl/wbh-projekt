package com.github.dmn1k.tfm.inserate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StoryController {
    @Autowired
    private StoriesRepository storiesRepository;

    @GetMapping("/stories")
    public List<Story> stories(){
        return storiesRepository.findAll();
    }
}
