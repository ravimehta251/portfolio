import fs from 'node:fs';
import path from 'node:path';

const base = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const notes = fs.readFileSync(path.join(base, 'technical-notes.md'), 'utf8');
const chapters = notes.split(/^# Topic \d+ — /m).slice(1);
const expected = ['Spring Cloud Gateway', 'Event-Driven Architecture', 'Tailwind CSS', 'WebSocket with STOMP', 'JUnit'];
for (const [i, chapter] of chapters.entries()) {
  if (!chapter.startsWith(expected[i])) throw new Error(`Wrong chapter order ${i}`);
  for (const heading of ['## 1. What is it?', '## 2. Core Concepts', '## 3. Architecture / Working Flow', '## Common Mistakes', '## Quick Revision', '## Remember This for Interviews']) {
    if (!chapter.includes(heading)) throw new Error(`Missing ${heading} in ${expected[i]}`);
  }
  for (const [title, count] of [['10 beginner questions', 10], ['10 intermediate questions', 10], ['5 scenario-based questions', 5]]) {
    const section = chapter.split(`### ${title}\n`)[1]?.split(/^##/m)[0];
    const actual = [...(section ?? '').matchAll(/^\d+\. \*\*/gm)].length;
    if (actual !== count) throw new Error(`${expected[i]} ${title}: ${actual}, expected ${count}`);
  }
}
const fences = [...notes.matchAll(/^```/gm)].length;
if (fences % 2) throw new Error('Unclosed code fence');

function write(relative, data) {
  const destination = path.join(base, 'examples', relative);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, data.trim() + '\n', 'utf8');
}
const blocks = [...notes.matchAll(/^```([^\n]*)\n([\s\S]*?)^```/gm)].map(match => ({lang: match[1], text: match[2]}));
const modules = {gateway: 'gateway', users: 'user-service', products: 'product-service', events: 'events-demo', chat: 'chat-demo', testing: 'testing-demo'};
let javaCount = 0;
for (const block of blocks.filter(block => block.lang === 'java')) {
  const pkg = block.text.match(/^package (com\.example\.(\w+));/m);
  if (!pkg) continue;
  const type = block.text.match(/^(?:public )?(?:class|record|interface) (\w+)/m)?.[1];
  if (!type) throw new Error('No top-level type found');
  const module = modules[pkg[2]];
  if (['GatewayRoutes', 'GatewaySecurity'].includes(type)) {
    write(`${module}/alternatives/${type}.java`, block.text);
    continue;
  }
  const source = type.endsWith('Test') ? 'test' : 'main';
  write(`${module}/src/${source}/java/${pkg[1].replaceAll('.', '/')}/${type}.java`, block.text);
  javaCount++;
}
function entry(pkg, type) {
  return `package com.example.${pkg};\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n@SpringBootApplication\npublic class ${type} {\n public static void main(String[] args) { SpringApplication.run(${type}.class,args); }\n}`;
}
for (const [pkg, type] of [['users', 'UsersApplication'], ['products', 'ProductsApplication'], ['events', 'EventsApplication'], ['testing', 'TestingApplication']]) {
  write(`${modules[pkg]}/src/main/java/com/example/${pkg}/${type}.java`, entry(pkg, type));
}
const gatewayPom = blocks.find(block => block.lang === 'xml' && block.text.includes('<artifactId>gateway-demo</artifactId>')).text;
const chatPom = blocks.find(block => block.lang === 'xml' && block.text.includes('<artifactId>chat-demo</artifactId>')).text;
write('gateway/pom.xml', gatewayPom);
write('chat-demo/pom.xml', chatPom);
function commonPom(name, dependencies) {
  return `<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">\n<modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>3.5.16</version><relativePath/></parent><groupId>com.example</groupId><artifactId>${name}</artifactId><version>1.0.0</version><properties><java.version>21</java.version></properties>\n${dependencies}\n<build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build></project>`;
}
const backendDeps = '<dependencies><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency></dependencies>';
for (const module of ['user-service', 'product-service']) write(`${module}/pom.xml`, commonPom(module, backendDeps));
const eventDeps = blocks.find(block => block.lang === 'xml' && block.text.includes('<artifactId>spring-kafka</artifactId>')).text;
const testDeps = blocks.find(block => block.lang === 'xml' && block.text.includes('<artifactId>spring-boot-starter-test</artifactId>')).text;
write('events-demo/pom.xml', commonPom('events-demo', eventDeps));
write('testing-demo/pom.xml', commonPom('testing-demo', testDeps));
const yamls = blocks.filter(block => block.lang === 'yaml' && block.text.startsWith('server:\n'));
write('gateway/src/main/resources/application.yml', yamls.find(block => block.text.includes('users-route')).text);
write('events-demo/src/main/resources/application.yml', yamls.find(block => block.text.includes('bootstrap-servers')).text);
for (const [module, port] of [['user-service', 8081], ['product-service', 8082], ['chat-demo', 8084]]) write(`${module}/src/main/resources/application.properties`, `server.port=${port}`);
const chatHtml = blocks.find(block => block.lang === 'html' && block.text.startsWith('<!doctype html>')).text;
write('chat-demo/src/main/resources/static/index.html', chatHtml);
write('pom.xml', `<project xmlns="http://maven.apache.org/POM/4.0.0"><modelVersion>4.0.0</modelVersion><groupId>com.example</groupId><artifactId>technical-notes-examples</artifactId><version>1.0.0</version><packaging>pom</packaging><modules>${Object.values(modules).map(module => `<module>${module}</module>`).join('')}</modules></project>`);
write('README.md', `# Companion examples\n\nGenerated directly from the study guide. Java 21 and Maven are required. From this directory run \`mvn test\` to compile all projects and run the JUnit chapter tests. Each module is independently runnable with \`mvn spring-boot:run\`.\n\nGateway :8080 routes to User Service :8081 and Product Service :8082. Start all three to test routing. The optional featured-product endpoint demonstrates User Service calling Product Service. Java route and JWT extensions are in gateway/alternatives; follow the guide before enabling them.\n\nEvents demo :8083 requires Kafka at localhost:9092. Chat demo :8084 serves its own browser page; the page loads StompJS from a CDN. Testing demo uses in-memory storage and has no external database.\n\nThe guide's Tailwind examples are frontend snippets, not part of the Maven reactor. These examples intentionally use the guide's Boot 3.5 / JUnit 5 teaching baseline. Choose currently supported versions before production use.\n`);
console.log(JSON.stringify({chapters: chapters.length, interviewQuestions: 125, words: notes.split(/\s+/).length, codeBlocks: blocks.length, extractedJavaFiles: javaCount + 4}, null, 2));
