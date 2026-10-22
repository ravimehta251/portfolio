package com.example.users;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class UserProductController {
    private final RestClient products;

    public UserProductController(RestClient.Builder builder) {
        this.products = builder.baseUrl("http://localhost:8082").build();
    }

    public record ProductView(long id, String name) {}
    public record UserProductView(long userId, ProductView featuredProduct) {}

    @GetMapping("/users/{id}/featured-product")
    public UserProductView featured(@PathVariable("id") long id) {
        ProductView product = products.get().uri("/products/7")
            .retrieve().body(ProductView.class);
        return new UserProductView(id, product);
    }
}
