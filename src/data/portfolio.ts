import type { Project } from '../types/portfolio'

// Professional claims verified against public/resume.pdf. Keep this file as the content source.
export const profile = {
  name: 'Ravi Kumar', role: 'Backend-Focused Software Engineer', location: 'Bengaluru, India',
  email: 'ravi7481081raj@gmail.com', phone: '+91 77070 00206',
  github: 'https://github.com/ravimehta251', linkedin: 'https://www.linkedin.com/in/ravi-mehta2511/',
  leetcode: 'https://leetcode.com/u/ravi_kumar_129/', resume: '/resume.pdf',
  introduction: 'Java & Spring Boot at the core. Distributed systems, real-time applications, and AI-powered products from architecture to interface.',
}
export const toolkit = [
  { name: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'WebSocket', 'Microservices'] },
  { name: 'Frontend', skills: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Databases & Messaging', skills: ['PostgreSQL', 'pgvector', 'MySQL', 'Redis', 'Apache Kafka'] },
  { name: 'AI Integration', skills: ['Spring AI', 'Azure OpenAI', 'RAG', 'Vector Embeddings', 'Semantic Search'] },
  { name: 'DevOps & Testing', skills: ['Docker', 'Docker Compose', 'AWS EC2', 'GitHub Actions', 'Git', 'Maven', 'JUnit', 'Testcontainers', 'Postman'] },
]
export const projects: Project[] = [
  { id: 'recall', name: 'Recall', category: 'AI / RAG', title: 'Private Document Knowledge Workspace',
    description: 'A private document knowledge workspace. Upload PDF, DOCX, or TXT files and chat with an assistant that retrieves relevant context and cites its sources.',
    stack: ['Java 21', 'Spring Boot 3', 'Spring AI', 'PostgreSQL 16', 'pgvector', 'React 19', 'TypeScript', 'Azure OpenAI', 'JWT'],
    github: 'https://github.com/ravimehta251/Recall',
    problem: 'Make private documents searchable through a conversational interface, with responses grounded in retrieved passages and traceable sources.',
    solution: 'An end-to-end RAG pipeline parses and chunks files in memory, embeds them using Azure OpenAI or local Ollama, stores vectors in pgvector, and streams cited answers to a React interface.',
    decisions: ['Spring AI handles in-memory document parsing and chunking.', 'PostgreSQL 16 with pgvector stores document embeddings for retrieval.', 'Authenticated SSE delivers token, citation, and completion events.', 'JWT and Spring Security protect knowledge-space, document, and chat endpoints.', 'React 19, TypeScript, Vite, Tailwind CSS, and Zustand power the frontend.'],
    outcome: 'Token-by-token responses with source citations and local Ollama support.', metric: 'RAG', metricLabel: 'Source-grounded answers' },
  { id: 'bidly', name: 'Bidly', category: 'REAL-TIME SYSTEMS', title: 'Real-Time Auction & Bidding Platform',
    description: 'A real-time auction and bidding platform built around safe concurrent writes, live price updates, and synchronized backend instances.',
    stack: ['Java 21', 'Spring Boot 3.3', 'WebSocket / STOMP', 'Redis / Redisson', 'PostgreSQL', 'React 19', 'Nginx', 'Testcontainers'],
    github: 'https://github.com/ravimehta251/bidly',
    problem: 'Simultaneous bids across backend instances can create conflicting writes and double-selling.',
    solution: 'Redisson distributed locks and JPA optimistic locking coordinate writes, while Redis Pub/Sub carries live updates to every backend instance behind Nginx.',
    decisions: ['Combine distributed locks with JPA optimistic locking to stop double-selling.', 'WebSocket / STOMP broadcasts live prices and auction-close updates.', 'Redis Pub/Sub synchronizes updates across backend instances.', 'JWT and Spring Security protect auction write operations.', 'JUnit 5, Spring Security Test, and Testcontainers verify backend behavior; Nginx serves the frontend and API.'],
    outcome: 'A 200-thread concurrency test produced zero conflicting writes.', metric: '200', metricLabel: 'Threads · zero conflicting writes' },
  { id: 'shopmesh', name: 'ShopMesh', category: 'DISTRIBUTED SYSTEMS', title: 'Distributed E-Commerce Microservices',
    description: 'An event-driven e-commerce platform where inventory, orders, and payments coordinate through Kafka, with compensation when payment fails.',
    stack: ['Java 21', 'Spring Boot 3.3', 'Spring Cloud Gateway', 'Eureka', 'Kafka', 'MySQL', 'React 18', 'Docker Compose', 'AWS EC2'],
    github: 'https://github.com/ravimehta251/ShopMesh',
    problem: 'Checkout crosses independent services and databases. Payment failure must release reserved stock and recover order state.',
    solution: 'Five Spring Boot microservices use a Kafka event-driven saga and transactional outbox pattern. Compensating events release inventory when payment fails.',
    decisions: ['Gateway, discovery, inventory, order, and payment run as five microservices.', 'Spring Cloud Gateway routes requests; Eureka provides service discovery.', 'A transactional outbox coordinates state changes across six Kafka event types.', 'Three separate MySQL databases are versioned with Flyway.', 'Stateless JWT authorization guards every routed request; GitHub Actions deploys the Compose stack to EC2 on pushes to main.'],
    outcome: 'Five microservices, six Kafka event types, and three isolated MySQL databases.', metric: '5', metricLabel: 'Services · event-driven checkout' },
]
export const education = {
  university: 'Visvesvaraya Technological University', abbreviation: 'VTU', location: 'Belagavi, Karnataka',
  degree: 'Bachelor of Engineering', field: 'Information Science and Engineering',
  dates: 'September 2023 — July 2027', graduation: 'July 2027', cgpa: '8.1',
  coursework: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Operating Systems', 'Computer Networks', 'Database Management Systems'],
}
