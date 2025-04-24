# Full Stack Assessment

This project is a fullstack online store application built with modern technologies across backend and frontend. It includes JWT-based authentication, dual database integration, cloud deployment (AWS), and a fully responsive design.

## Table of Contents

- [Full Stack Assessment](#full-stack-assessment)
  - [Table of Contents](#table-of-contents)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Infrastructure](#infrastructure)
  - [Theory](#theory)
    - [Java Spring Framework](#java-spring-framework)
    - [Databases](#databases)
    - [AWS](#aws)
    - [Microservices \& Kubernetes](#microservices--kubernetes)

## Backend

The backend is built with **Spring Boot 3.4.4** using **Java 24**. It handles business logic, data persistence, and security with JWT. The system uses **PostgreSQL** for relational entities and **MongoDB Atlas** for document-based data. Security is implemented using a custom filter that reads JWT from cookies and supports role-based access (`USER`, `ADMIN`).

➡️ See detailed documentation in [`/backend/README.md`](./backend/README.md)

## Frontend

The frontend is developed using **React + Next.js** with a responsive layout powered by **TailwindCSS**. It implements protected routes, cookie-based JWT authentication, reusable components, password strength meters, and basic animations. **Global state is managed using Redux** to store the authenticated user and support role-based rendering across the app.

➡️ See detailed documentation in [`/frontend/README.md`](./frontend/README.md)

## Infrastructure

The project is designed for deployment on **AWS**, using **EC2** for hosting, **RDS** for PostgreSQL, and **MongoDB Atlas** for NoSQL storage. Proper CORS configuration and environment-based secret management are implemented to ensure secure communication. Scalability and resilience are considered with the use of **AWS services** for high availability.

➡️ See detailed documentation in [`/infra/README.md`](./infra/README.md)

## Theory

This section contains answers to conceptual and technical questions regarding the stack used, best practices, and design decisions made throughout the project.


### Java Spring Framework

- **What is Dependency Injection, and why is it important?**  
  > Dependency injection (DI) is a design pattern that allows us to separate the creation of dependencies from the objects that depend on them.  
  > The main advantages of DI are:  
  > - Separates the dependencies from the instance allowing us to inject only the dependencies that we need and when we need them.  
  > - Improves testing and mantainability by mocking the dependancies making them easier to test.  
  > - The decoupled nature allows components to be reused across the application or in different contexts.

- **What’s the difference between Spring MVC and Spring Boot?**  
  > **Spring MVC** is a framework for developing web applications followinf the design patter **Model-View-Controller** that provides a comprehensive structure. On the other hand, **Spring Boot** is a framework built on top of Spring that simplifies the development of Spring applications by adding autoconfiguration, Embedded Servers, and reducing the process of configuration.

### Databases

- **Compare MongoDB vs. PostgreSQL: data model, queries, scalability.**  
  > - **MongoDB**:  
  >   - **Model**: MongoDB is a NoSQL database that uses a document-based model stored in BSON(Binary JSON) format. It does not have a structured schema meaning that 2 documents of the same collection can have different structures.  
  >   - **Queries**: It uses JavaScript-like query system for filtering and retrieving data. This queries are flexible but become less efficient with the complexity of the query.  
  >   - **Scalability**: The horizontal scalability es the main feature of MongoDB, it allows you to distribute data across server(sharding) and it is capable of handleing large amounts of unstructerd or semi-structured data.  
  > - **PostgreSQL**:  
  >   - **Model**: A relational database that uses a tabular structure with predefined schemas and tables. It enforces ACID (Atomicity, Consistency, Isolation, Durability) properties for transactions and ensures data integrity.  
  >   - **Queries**: Uses SQL (Structured Query Language), which supports complex joins, aggregates, and transactions. It offers better performance for complex queries, especially with normalized data.  
  >   - **Scalability**: PostgreSQL is more vertically scalable (increasing the capacity of a single server). However, it generally handles complex transactions more efficiently than MongoDB.

- **When would you choose one over the other?**  
  > Choose **MongoDB** if:  
  > - You need to handle large volumes of unstructured or semi-structured data.  
  > - The schema might evolve over time, and you need flexibility to store different document structures.  
  > - Your app requires horizontal scalability across many servers or clusters.  
  > - You need fast and flexible development cycles with less concern for complex relationships or joins.  
  >
  > Choose **PostgreSQL** if:  
  > - You need to enforce strong data integrity and handle complex queries or transactional systems.  
  > - Your data is highly structured and involves complex relationships (e.g., many-to-many).  
  > - You require ACID compliance and strong consistency.  
  > - Your app may benefit from complex joins, aggregation, and reporting.

### AWS

- **Compare EC2 and ECS.**  
  > - **EC2 (Elastic Compute Cloud)**:  
  >   - Virtual Machines (VMs) that allow you to run your application on scalable compute instances. You have full control over the operating system, software, and configuration.  
  >   - Use EC2 when you need to run custom applications or have specific control over the server environment.  
  > - **ECS (Elastic Container Service)**:  
  >   - A container orchestration service that makes it easy to run, scale, and manage Docker containers on AWS.  
  >   - ECS abstracts away the underlying server management and is ideal for microservices architectures where your applications are divided into containerized services.

- **How would you ensure high availability and fault tolerance?**  
  > **High Availability**:  
  > - Use multiple availability zones (AZs): Distribute your resources across multiple AZs to avoid a single point of failure.  
  > - Auto Scaling: Set up auto-scaling groups to automatically adjust the number of EC2 instances in response to traffic changes.  
  > - Load Balancers: Use Elastic Load Balancer (ELB) to distribute traffic across multiple instances to ensure that no single instance gets overwhelmed.  
  >
  > **Fault Tolerance**:  
  > - Backups: Set up regular backups for critical services.  
  > - Multi-Region Deployment: For critical systems, consider deploying in multiple regions for even higher availability and disaster recovery.  
  > - Health Checks: Use CloudWatch for monitoring and set up health checks to automatically replace failed instances.

### Microservices & Kubernetes

- **Define microservices and their benefits.**  
  > Microservices is an architectural style where an application is broken down into small, independently deployable services that focus on a specific business capability. Each service is loosely coupled, can be developed, deployed, and scaled independently.  
  >
  > **Benefits:**  
  > - Scalability: Each service can be scaled independently based on demand.  
  > - Resilience: Failure in one service does not bring down the entire system.  
  > - Faster Development: Teams can work on different services in parallel, speeding up development and deployment.  
  > - Technology Agnostic: Different microservices can be made with different technologies best suited for their needs.

- **Explain how Kubernetes supports microservices architectures.**  
  > Kubernetes is an open-source platform for automating the deployment, scaling, and management of containerized applications. It is particularly beneficial for microservices architectures in the following ways:  
  > - Orchestration: Kubernetes manages the deployment and scaling of microservices containers, ensuring that the desired number of replicas are running and balancing the load between them.  
  > - Service Discovery: Kubernetes provides an internal DNS service to enable microservices to discover each other and communicate easily within the cluster.  
  > - Fault Tolerance: Kubernetes automatically restarts failed containers and reschedules them on available nodes to ensure high availability.  
  > - Scalability: Kubernetes can scale microservices up or down automatically based on demand, ensuring optimal resource usage.

