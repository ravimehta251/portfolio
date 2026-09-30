import type { Project } from '../types/portfolio'

// Source: H:/RAVI_RESUME.pdf. Demo inputs illustrate architecture, not measured results.
export const profile = {
  name: 'Ravi Kumar', role: 'Software Engineer', location: 'Bengaluru, India',
  email: 'ravi7481081raj@gmail.com', phone: '+91 77070 00206',
  github: 'https://github.com/ravimehta251', linkedin: 'https://www.linkedin.com/in/ravi-mehta2511/',
  leetcode: 'https://leetcode.com/u/ravi_kumar_129/', resume: '/resume.pdf',
  introduction: 'Java & Spring Boot at the core. Distributed systems, real-time applications, and AI-powered products from architecture to interface.',
}
export const navigation = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' }, { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' }, { id: 'contact', label: 'Contact' },
]
export const skillGroups = [
  { name: 'Languages', code: '01', description: 'The foundations of every system.', skills: ['Java', 'JavaScript (ES6+)', 'SQL', 'TypeScript'], usedIn: 'Java 21 powers all three projects. TypeScript brings type safety to Recall.' },
  { name: 'Backend', code: '02', description: 'Secure services. Clear boundaries.', skills: ['Spring Boot', 'Spring AI', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Spring Cloud Gateway', 'Eureka', 'Microservices', 'Event-Driven Architecture'], usedIn: 'Spring Boot is the backbone of Recall, Bidly, and ShopMesh.' },
  { name: 'Frontend', code: '03', description: 'Where complex systems feel simple.', skills: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Zustand'], usedIn: 'React 19 interfaces for Recall and Bidly; React 18 for ShopMesh.' },
  { name: 'APIs & Real-Time', code: '04', description: 'From requests to live streams.', skills: ['RESTful APIs', 'JWT Authentication', 'WebSocket (STOMP)', 'Server-Sent Events (SSE)', 'Swagger / OpenAPI'], usedIn: 'Bidly broadcasts over STOMP. Recall streams tokens and citations over authenticated SSE.' },
  { name: 'Data & Messaging', code: '05', description: 'Reliable state. Events in motion.', skills: ['PostgreSQL', 'pgvector', 'MySQL', 'Redis', 'Apache Kafka', 'Flyway'], usedIn: 'Vector retrieval in Recall, Redis Pub/Sub in Bidly, and Kafka sagas in ShopMesh.' },
  { name: 'AI / RAG', code: '06', description: 'Answers grounded in your documents.', skills: ['Retrieval-Augmented Generation', 'Vector Embeddings', 'Semantic Search', 'Spring AI', 'Azure OpenAI', 'Ollama'], usedIn: 'Recall connects document chunks to cited answers, with Azure OpenAI and local Ollama support.' },
  { name: 'System Design', code: '07', description: 'Built for the difficult edge cases.', skills: ['Distributed Systems', 'Event-Driven Sagas', 'Distributed Locking', 'Concurrency & Multithreading', 'Object-Oriented Design'], usedIn: 'Distributed and optimistic locks protect Bidly; compensating events recover ShopMesh checkout.' },
  { name: 'DevOps & Cloud', code: '08', description: 'From local development to deployment.', skills: ['Git', 'Maven', 'Docker', 'Docker Compose', 'AWS (EC2)', 'GitHub Actions (CI/CD)', 'Nginx'], usedIn: 'ShopMesh deploys its Docker Compose stack to EC2 on every push to main.' },
  { name: 'Testing & Tools', code: '09', description: 'Confidence through verification.', skills: ['JUnit', 'JUnit 5', 'Spring Security Test', 'Testcontainers', 'Postman'], usedIn: 'Bidly combines backend tests with a 200-thread concurrency test.' },
]
export const projects: Project[] = [
  { id: 'recall', name: 'Recall', category: 'AI / RAG', title: 'Your documents. Connected intelligence.',
    description: 'A private document knowledge workspace. Upload PDF, DOCX, or TXT files and chat with an assistant that retrieves relevant context and cites its sources.',
    stack: ['Java 21', 'Spring Boot 3', 'Spring AI', 'PostgreSQL 16', 'pgvector', 'React 19', 'TypeScript', 'Azure OpenAI', 'JWT'],
    github: 'https://github.com/ravimehta251/Recall',
    problem: 'Make private documents searchable through a conversational interface, with responses grounded in retrieved passages and traceable sources.',
    solution: 'An end-to-end RAG pipeline parses and chunks files in memory, embeds them using Azure OpenAI or local Ollama, stores vectors in pgvector, and streams cited answers to a React interface.',
    decisions: ['Spring AI handles in-memory document parsing and chunking.', 'PostgreSQL 16 with pgvector stores document embeddings for retrieval.', 'Authenticated SSE delivers token, citation, and completion events.', 'JWT and Spring Security protect knowledge-space, document, and chat endpoints.', 'React 19, TypeScript, Vite, Tailwind CSS, and Zustand power the frontend.'],
    outcome: 'Token-by-token responses with source citations and local Ollama support.', metric: 'RAG', metricLabel: 'Source-grounded answers' },
  { id: 'bidly', name: 'Bidly', category: 'REAL-TIME SYSTEMS', title: 'Every bid counts. Exactly once.',
    description: 'A real-time auction and bidding platform built around safe concurrent writes, live price updates, and synchronized backend instances.',
    stack: ['Java 21', 'Spring Boot 3.3', 'WebSocket / STOMP', 'Redis / Redisson', 'PostgreSQL', 'React 19', 'Nginx', 'Testcontainers'],
    github: 'https://github.com/ravimehta251/bidly',
    problem: 'Simultaneous bids across backend instances can create conflicting writes and double-selling.',
    solution: 'Redisson distributed locks and JPA optimistic locking coordinate writes, while Redis Pub/Sub carries live updates to every backend instance behind Nginx.',
    decisions: ['Combine distributed locks with JPA optimistic locking to stop double-selling.', 'WebSocket / STOMP broadcasts live prices and auction-close updates.', 'Redis Pub/Sub synchronizes updates across backend instances.', 'JWT and Spring Security protect auction write operations.', 'JUnit 5, Spring Security Test, and Testcontainers verify backend behavior; Nginx serves the frontend and API.'],
    outcome: 'A 200-thread concurrency test produced zero conflicting writes.', metric: '200', metricLabel: 'Threads · zero conflicting writes' },
  { id: 'shopmesh', name: 'ShopMesh', category: 'DISTRIBUTED SYSTEMS', title: 'Independent services. One reliable checkout.',
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
