package com.example.events;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record OrderCreatedEvent(
    UUID eventId,
    int schemaVersion,
    Instant occurredAt,
    String orderId,
    BigDecimal amount,
    String currency
) {}
