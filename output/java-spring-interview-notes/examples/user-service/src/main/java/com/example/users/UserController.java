package com.example.users;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    public record UserView(long id, String name) {}

    @GetMapping("/users/{id}")
    public UserView get(@PathVariable("id") long id) {
        return new UserView(id, "Ravi");
    }
}
