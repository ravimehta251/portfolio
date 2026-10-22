package com.example.gateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class TimingFilter implements GlobalFilter, Ordered {
    private static final Logger log = LoggerFactory.getLogger(TimingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return Mono.defer(() -> {
            long started = System.nanoTime();
            return chain.filter(exchange).doFinally(signal ->
                log.info("requestId={} method={} path={} status={} elapsedMs={} signal={}",
                    exchange.getRequest().getId(),
                    exchange.getRequest().getMethod(),
                    exchange.getRequest().getPath(),
                    exchange.getResponse().getStatusCode(),
                    (System.nanoTime() - started) / 1_000_000, signal));
        });
    }

    @Override
    public int getOrder() { return -100; }
}
