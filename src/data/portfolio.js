export const links = {
  github: 'https://github.com/ravimehta251',
  linkedin: 'https://www.linkedin.com/in/ravi-mehta2511/',
  leetcode: 'https://leetcode.com/u/ravi_kumar_129/',
  email: 'mailto:ravi7481081raj@gmail.com',
  resume: import.meta.env.VITE_RESUME_URL,
};

export const navItems = [
  ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'],
  ['Education', 'education'], ['Achievements', 'achievements'], ['Contact', 'contact'],
];

export const skillGroups = [
  { title: 'Languages', icon: 'code', skills: ['Java', 'JavaScript ES6+', 'SQL'] },
  { title: 'Backend', icon: 'server', skills: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Spring Cloud Gateway', 'Microservices', 'Event-Driven Architecture'] },
  { title: 'APIs & Real-Time', icon: 'radio', skills: ['RESTful API Design', 'JWT Authentication', 'Role-Based Access Control', 'WebSocket', 'STOMP', 'Swagger / OpenAPI'] },
  { title: 'Data & Messaging', icon: 'database', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'Flyway'] },
  { title: 'Frontend', icon: 'layout', skills: ['React.js', 'Vite', 'HTML5', 'CSS3'] },
  { title: 'Tools & DevOps', icon: 'wrench', skills: ['Git', 'Maven', 'Docker', 'Docker Compose', 'GitHub Actions', 'Nginx', 'JUnit', 'Postman'] },
  { title: 'Computer Science', icon: 'cpu', skills: ['Data Structures & Algorithms', 'System Design', 'Distributed Systems', 'Concurrency & Multithreading', 'Object-Oriented Programming', 'Object-Oriented Design', 'Operating Systems', 'Computer Networks', 'Database Management Systems'] },
];

export const projects = [
  {
    id: 'bidly', number: '01', name: 'Bidly', title: 'Real-Time Auction and Bidding Platform',
    description: 'A real-time auction platform designed for concurrent bidding, live price updates, secure APIs, and horizontally scalable communication.',
    stack: ['Java 21', 'Spring Boot 3.3', 'WebSocket + STOMP', 'Redis + Redisson', 'PostgreSQL', 'React 18', 'Nginx', 'GitHub Actions'],
    github: 'https://github.com/ravimehta251/bidly',
    challenge: 'Concurrent bids could race for the same auction state, risking conflicting writes and a double-sell outcome across application instances.',
    solution: 'Combined Redisson distributed locks with JPA optimistic locking, then synchronized real-time updates through Redis Pub/Sub and WebSocket/STOMP behind Nginx.',
    highlights: [
      'Reproduced the original concurrency failure with a 200-thread test, then verified zero conflicting writes after the fix.',
      'Broadcast live prices through WebSocket/STOMP with server-authoritative countdown timers.',
      'Exposed 12 secured REST endpoints and persisted auction and bid histories in PostgreSQL.',
      'Built a GitHub Actions pipeline using PostgreSQL and Redis service containers before Docker image creation.',
    ],
  },
  {
    id: 'shopmesh', number: '02', name: 'ShopMesh', title: 'Distributed Event-Driven E-Commerce Platform',
    description: 'A distributed e-commerce platform that models checkout as an event-driven saga across independently deployable microservices.',
    stack: ['Java 21', 'Spring Boot 3.3', 'Spring Cloud Gateway', 'Netflix Eureka', 'Apache Kafka', 'MySQL', 'React 18', 'Docker Compose', 'GitHub Actions'],
    github: 'https://github.com/ravimehta251/ShopMesh',
    challenge: 'Checkout spans multiple services, so inventory, payment, and order state must remain recoverable without a single cross-service database transaction.',
    solution: 'Decomposed checkout into five services and used a six-event Kafka saga, transactional outbox, and compensating events to release inventory after payment failure.',
    highlights: [
      'Routed services through Spring Cloud Gateway with stateless JWT authorization protecting six routed endpoints.',
      'Used Netflix Eureka for discovery and Docker Compose health checks for local orchestration.',
      'Maintained three isolated MySQL schemas, versioned with Flyway.',
      'Committed order-state changes and event publication reliably through the transactional outbox pattern.',
    ],
  },
  {
    id: 'smartcoldmailer', number: '03', name: 'SmartColdMailer', title: 'Email Campaign Automation Platform',
    description: 'An email campaign platform supporting scheduled delivery, throttling, retries, secure credential handling, and engagement analytics.',
    stack: ['Spring Boot 3', 'React + Vite', 'MongoDB', 'JWT', 'SMTP', 'REST APIs', 'Docker'],
    github: 'https://github.com/ravimehta251/Cold-Emailing-Project',
    challenge: 'Campaign delivery needs to respect provider limits, recover from transient failures, protect SMTP credentials, and capture engagement without blocking the sender.',
    solution: 'Built a batched scheduling engine with configurable throttling and retries, encrypted credentials at rest, and aggregated tracking events in MongoDB.',
    highlights: [
      'Secured more than 10 REST endpoints with JWT and role-based access control.',
      'Measured opens through tracking pixels and clicks through redirect endpoints.',
      'Displayed aggregated campaign performance through a React dashboard.',
      'Supported batched and scheduled SMTP delivery with configurable provider rate limits.',
    ],
  },
];

export const metrics = [
  { value: 200, suffix: '', label: 'Thread concurrency test', note: 'Bidly failure reproduction' },

  { value: 12, suffix: '', label: 'Secured endpoints', note: 'Bidly REST API' },
  { value: 5, suffix: '', label: 'Microservices', note: 'ShopMesh checkout' },

  { value: 10, suffix: '+', label: 'Secured endpoints', note: 'SmartColdMailer' },
  { value: 500, suffix: '+', label: 'LeetCode problems', note: 'Continuous DSA practice' },
];

export const achievements = [
  { place: 'Runner-Up', event: 'HackAthena 2025', detail: 'National-level hackathon at Jyothy Engineering College. Placed among the top finalists from 1,259 registered teams.' },
  { place: 'Second Runner-Up', event: 'JSSATE Hackathon', detail: 'Built Snap2Clean, a civic-issue reporting platform using React, Google Maps API, and MySQL; recognized for technical execution and social impact.' },
  { place: '500+ Problems Solved', event: 'Data Structures & Algorithms', detail: 'Sustained LeetCode practice across arrays, strings, graphs, trees, and other core problem-solving topics.' },
];
