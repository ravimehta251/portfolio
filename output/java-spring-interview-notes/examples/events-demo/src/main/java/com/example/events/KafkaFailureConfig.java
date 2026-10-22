package com.example.events;

import jakarta.annotation.PreDestroy;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.ByteArraySerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.kafka.support.serializer.DelegatingByTypeSerializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class KafkaFailureConfig {
    private DefaultKafkaProducerFactory<Object, Object> recoveryFactory;

    @Bean
    DefaultErrorHandler kafkaErrorHandler(
            @Value("${spring.kafka.bootstrap-servers}") String brokers) {
        var properties = new HashMap<String, Object>();
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        properties.put(ProducerConfig.ACKS_CONFIG, "all");
        properties.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);

        var json = new JsonSerializer<OrderCreatedEvent>();
        json.setAddTypeInfo(false);
        var values = new DelegatingByTypeSerializer(Map.of(
            byte[].class, new ByteArraySerializer(),
            OrderCreatedEvent.class, json));

        var keys = new DelegatingByTypeSerializer(Map.of(
            String.class, new StringSerializer(),
            byte[].class, new ByteArraySerializer()));
        recoveryFactory = new DefaultKafkaProducerFactory<Object, Object>(
            properties, keys, values);
        var deadLetterTemplate = new KafkaTemplate<Object, Object>(recoveryFactory);
        var recoverer = new DeadLetterPublishingRecoverer(deadLetterTemplate);
        recoverer.setFailIfSendResultIsError(true);

        var handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 2L));
        handler.addNotRetryableExceptions(IllegalArgumentException.class);
        return handler;
    }

    @PreDestroy
    void closeRecoveryProducer() {
        if (recoveryFactory != null) recoveryFactory.destroy();
    }
}
