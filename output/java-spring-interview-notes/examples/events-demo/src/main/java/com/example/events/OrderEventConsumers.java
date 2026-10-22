package com.example.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventConsumers {
    private static final Logger log = LoggerFactory.getLogger(OrderEventConsumers.class);

    @KafkaListener(topics = KafkaTopics.ORDERS, groupId = "payments-demo")
    public void payment(OrderCreatedEvent event) {
        validate(event);
        log.info("Payment reaction eventId={} orderId={} amount={} currency={}",
            event.eventId(), event.orderId(), event.amount(), event.currency());
    }

    @KafkaListener(topics = KafkaTopics.ORDERS, groupId = "inventory-demo")
    public void inventory(OrderCreatedEvent event) {
        validate(event);
        log.info("Inventory reaction eventId={} orderId={}",
            event.eventId(), event.orderId());
    }

    @KafkaListener(topics = KafkaTopics.ORDERS, groupId = "notifications-demo")
    public void notification(OrderCreatedEvent event) {
        validate(event);
        log.info("Notification reaction eventId={} orderId={}",
            event.eventId(), event.orderId());
    }

    private static void validate(OrderCreatedEvent event) {
        if (event == null || event.schemaVersion() != 1 || event.eventId() == null
                || event.occurredAt() == null || event.orderId() == null
                || event.orderId().isBlank() || event.amount() == null
                || event.amount().signum() <= 0 || event.currency() == null
                || !event.currency().matches("[A-Z]{3}")) {
            throw new IllegalArgumentException("Invalid order event contract");
        }
    }
}
