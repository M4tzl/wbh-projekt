package com.github.dmn1k.wbhprojekt.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TodoItemController {
    @Autowired
    private TodoItemRepository todoRepo;

    @Value("${build.timestamp}")
    private String buildTimestamp;

    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("buildTimestamp", buildTimestamp);
        model.addAttribute("items", todoRepo.findAll());
        model.addAttribute("newItem", new TodoItem());
        return "index";
    }

    @PostMapping("/addTodo")
    public String addTodo(@ModelAttribute TodoItem todoItem) {
        todoRepo.save(todoItem);
        return "redirect:/";
    }


}
