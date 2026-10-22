# Verification of the study guide

Verified on 4 October 2026.

- All five chapters appear in the requested order.
- Every chapter has the requested foundations, core concepts, working flow, common mistakes, quick revision, and interview memory sections.
- Every chapter contains 10 beginner, 10 intermediate, and 5 scenario-based answered interview questions: 125 total.
- Markdown code fences are balanced. The guide contains approximately 20,000 whitespace-delimited words and 72 code blocks.
- Companion Java files were extracted from the guide, with the entry points and Maven configuration completed according to its instructions.
- The six Maven application modules compiled successfully with Java 21 and the guide's Spring Boot 3.5.16 baseline.
- JUnit results: 20 cases reported, 19 passed, 1 intentional educational `@Disabled` case skipped, 0 failures, 0 errors.
- The test boundary includes plain Java calculator tests, Mockito service tests, MockMvc controller slice tests, and the full-context in-memory user round trip.
- Three React JSX blocks passed syntax transpilation. The chat page's inline JavaScript passed syntax parsing.
- Tailwind 4 compiled 93 static utility candidates collected from the HTML/JSX examples. This verifies CSS generation, not visual appearance or accessibility.

Commands:

```powershell
node output/java-spring-interview-notes/prepare-examples.mjs
node output/java-spring-interview-notes/check-frontends.mjs
```

From `output/java-spring-interview-notes/examples`:

```powershell
mvn test
```

The actual Maven verification used a workspace-local dependency cache. Its initial restricted-network attempt failed before dependency resolution; a network-enabled retry completed successfully.

The optional JWT, rate-limit, Eureka, and alternative Java-route extensions were reviewed against official documentation but not activated. The Kafka demo compiled; no live broker delivery/DLT exercise was performed. The chat demo compiled and its client script parsed; live multi-tab delivery/reconnection was not exercised. The gateway and backend projects compiled; no live forwarding check was performed. Frontend UI snippets were not visually rendered. Instructions and expected results for those manual exercises are included in the guide.

Official sources supporting version-sensitive claims are linked near the relevant explanations in the guide. Spring Boot 3.5 / JUnit 5 is explicitly a teaching baseline; select currently supported releases before production deployment.
