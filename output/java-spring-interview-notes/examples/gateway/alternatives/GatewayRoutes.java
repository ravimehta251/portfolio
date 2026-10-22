package com.example.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutes {
    @Bean
    RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("users-route", route -> route.path("/api/users/**")
                .filters(filters -> filters.stripPrefix(1)
                    .addRequestHeader("X-Edge", "gateway-demo")
                    .addResponseHeader("X-Served-By", "gateway-demo"))
                .uri("http://localhost:8081"))
            .route("products-route", route -> route.path("/api/products/**")
                .filters(filters -> filters.stripPrefix(1))
                .uri("http://localhost:8082"))
            .build();
    }
}
