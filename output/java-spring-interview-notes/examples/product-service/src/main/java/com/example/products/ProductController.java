package com.example.products;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    public record ProductView(long id, String name) {}

    @GetMapping("/products/{id}")
    public ProductView get(@PathVariable("id") long id) {
        return new ProductView(id, "Keyboard");
    }
}
