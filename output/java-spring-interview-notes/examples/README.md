# Companion examples

Generated directly from the study guide. Java 21 and Maven are required. From this directory run `mvn test` to compile all projects and run the JUnit chapter tests. Each module is independently runnable with `mvn spring-boot:run`.

Gateway :8080 routes to User Service :8081 and Product Service :8082. Start all three to test routing. The optional featured-product endpoint demonstrates User Service calling Product Service. Java route and JWT extensions are in gateway/alternatives; follow the guide before enabling them.

Events demo :8083 requires Kafka at localhost:9092. Chat demo :8084 serves its own browser page; the page loads StompJS from a CDN. Testing demo uses in-memory storage and has no external database.

The guide's Tailwind examples are frontend snippets, not part of the Maven reactor. These examples intentionally use the guide's Boot 3.5 / JUnit 5 teaching baseline. Choose currently supported versions before production use.
