package com.example.events;

import jakarta.validation.Valid;
import java.util.concurrent.CompletableFuture;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo/order-events")
public class OrderEventController {
    private final OrderEventProducer producer;

    public OrderEventController(OrderEventProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<OrderCreatedEvent>> publish(
            @Valid @RequestBody CreateOrderRequest request) {
        return producer.publish(request).thenApply(event ->
            ResponseEntity.accepted().body(event));
    }
}
