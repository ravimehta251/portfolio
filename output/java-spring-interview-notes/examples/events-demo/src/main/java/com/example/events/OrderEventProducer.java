package com.example.events;

import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderEventProducer {
    private final KafkaTemplate<String, OrderCreatedEvent> kafka;

    public OrderEventProducer(KafkaTemplate<String, OrderCreatedEvent> kafka) {
        this.kafka = kafka;
    }

    public CompletableFuture<OrderCreatedEvent> publish(CreateOrderRequest request) {
        var event = new OrderCreatedEvent(UUID.randomUUID(), 1, Instant.now(),
            request.orderId(), request.amount(), request.currency());
        return kafka.send(KafkaTopics.ORDERS, event.orderId(), event)
            .thenApply(result -> event);
    }
}
