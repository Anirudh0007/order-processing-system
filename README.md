# Backend Engineering Learning Project (BELP)

> A production-inspired e-commerce backend built using **Node.js, Express, MongoDB, Redis, BullMQ, Docker, and Stripe**.
>
> This project demonstrates modern backend engineering practices including layered architecture, authentication, asynchronous background processing, payment integration, structured logging, centralized error handling, and scalable backend design.

---

# Table of Contents

- Project Overview
- Features
- Tech Stack
- System Architecture
- Production Concepts Demonstrated
- Project Structure
- API Overview
- Database Design
- Background Job Processing
- Logging & Error Handling
- Getting Started
- Environment Variables
- Future Roadmap
- License

---

# Project Overview

BELP (Backend Engineering Learning Project) is a production-inspired backend application developed to simulate how modern backend systems are built.

Unlike traditional CRUD projects, BELP focuses on engineering practices commonly used in production systems, including:

- Layered Architecture
- Authentication & Authorization
- Payment Processing
- Queue-based Background Processing
- Dockerized Development
- Structured Logging
- Centralized Error Handling
- Scalable Service Design

The primary goal of this project is to understand not only **how APIs are built**, but also **how production backend systems communicate, scale, and remain maintainable.**

---

# Features


## Product Management

- Create Product
- Update Product
- Delete Product
- Browse Products
- Inventory Management

---

---

## Order Management

- Create Orders
- Order Status Tracking
- Order History

---

## Payments

- Stripe Payment Intents
- Payment Confirmation
- Stripe Webhooks
- Duplicate Webhook Protection (Idempotency)

---

## Background Processing

- Inventory Reservation Queue
- Invoice Generation Queue
- Email Notification Queue

Powered by:

- BullMQ
- Redis

---

## Infrastructure

- Docker
- Pino Logging
- Environment Validation
- Global Error Handling

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Queue System

- Redis
- BullMQ

## Payments

- Stripe

## Authentication

- JWT
- bcrypt

## Email

- Nodemailer

## Infrastructure

- Docker


## Logging

- Pino

---

# System Architecture

```

                    Client
                       │
                       ▼
               Express REST API
                       │
        Authentication Middleware
                       │
                       ▼
              Controller Layer
                       │
                       ▼
                Service Layer
        ┌──────────────┴──────────────┐
        ▼                             ▼
    MongoDB                     Redis/BullMQ
                                      │
      ┌───────────────┬───────────────┴───────────────┐
      ▼               ▼                              ▼
Inventory Worker  Invoice Worker              Email Worker
                                     
                                      ▼
                              External Services
                           Stripe • SMTP Email

```

---

# Production Concepts Demonstrated

This project demonstrates several backend engineering concepts commonly used in production systems.

- Layered Architecture
- REST API Design
- Authentication & Authorization
- Queue-Based Architecture
- Asynchronous Processing
- Stripe Payment Integration
- Webhook Processing
- Inventory Reservation
- Invoice Generation
- Email Notifications
- Structured Logging
- Dockerized Development
- Environment Configuration
- Global Error Handling
- Scalable Service Design

---

# Project Structure

```

src/

├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── services/
│
├── queues/
│
├── workers/
│
├── utils/
│
├── validations/
│
└── app.js

```

### Folder Responsibilities

| Folder | Responsibility |
|---------|---------------|
| config | Infrastructure configuration |
| controllers | Handle incoming HTTP requests |
| services | Business logic |
| models | MongoDB schemas |
| routes | API routes |
| middleware | Express middleware |
| queues | BullMQ queue definitions |
| workers | Background job processors |
| utils | Helper functions |
| validations | Request validation |

---

# API Overview

```

---

## Products

POST /api/v1/products  
PUT /api/v1/products/:id  
DELETE /api/v1/products/:id

```



## Orders

```

POST /api/v1/orders
GET /api/v1/orders
GET /api/v1/orders/:id

```

---

## Payments

```

POST /api/v1/payments/create-intent
POST /api/v1/payments/confirm
POST /api/v1/payments/webhook

```

---

# Database Design

Collections used in BELP:

- Users
- Products
- Cart
- Orders
- Payments

Relationships:

```

User
 │
 ├──── Cart  (Yet to complete)
 │
 └──── Orders
          │
          ├──── Payment
          │
          └──── Products

```

---

# Background Job Processing

After a successful payment:

```

Stripe Webhook

↓

Payment Updated

↓

Order Updated

↓

BullMQ

↓

Inventory Queue

↓

Invoice Queue

↓

Email Queue

↓

Workers Execute

```

This architecture ensures that expensive operations do not block the user request.

---

# Logging & Error Handling

BELP includes:

- Pino Logging  
- Centralized Error Middleware
- Custom Error Classes
- Structured API Responses
- Production-ready Error Logging


Start backend:

```

npm install

npm run dev

```

---

# Environment Variables

Example:

```

PORT=

MONGO_URI=

JWT_SECRET=

REDIS_HOST=

REDIS_PORT=

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

EMAIL_USER=

EMAIL_PASS=

```

---

# Future Roadmap

BELP will continue evolving with production-grade backend concepts.

Planned improvements include:

- Kafka Integration
- Dead Letter Queue
- Retry Mechanism
- Bull Board Dashboard
- Redis Caching
- Redis Pub/Sub
- Kubernetes Deployment
- CI/CD Pipeline
- GitHub Actions
- AWS Deployment
- Distributed Tracing
- Metrics & Monitoring
- API Rate Limiting
- Refresh Tokens
- Multi-Service Architecture

---

# Learning Goals

This project was built to gain practical experience with:

- Backend Engineering
- System Design
- Distributed Systems
- Asynchronous Processing
- Production Architecture
- Docker
- Redis
- BullMQ
- Payment Gateways
- REST API Design

---

# License

This project is developed for educational purposes as part of the Backend Engineering Learning Project (BELP).

# SYSTEM ARCHITECTURE

                                    +----------------------+
                                    |       Client         |
                                    | (Postman / Frontend) |
                                    +----------+-----------+
                                               |
                                               | HTTP Request
                                               v
                         +-------------------------------------------+
                         |         Express REST API                  |
                         |-------------------------------------------|
                         | Routes → Middleware → Controllers         |
                         +-------------------+-----------------------+
                                             |
                                             v
                                   +-------------------+
                                   |   Service Layer   |
                                   | Business Logic    |
                                   +----+---------+----+
                                        |         |
                           Database      |         | Background Jobs
                                        |         |
                                        v         v
                             +----------------+   +------------------+
                             |    MongoDB     |   | Redis + BullMQ   |
                             +----------------+   +--------+---------+
                                                            |
                                      +---------------------+----------------------+
                                      |                     |                      |
                                      v                     v                      v
                            +----------------+   +----------------+    +----------------+
                            | Inventory      |   | Invoice        |    | Email          |
                            | Worker         |   | Worker         |    | Worker         |
                            +--------+-------+   +--------+-------+    +--------+-------+
                                     |                    |                     |
                                     |                    |                     |
                                     +---------+----------+---------------------+
                                               |
                                               v
                                   +---------------------------+
                                   | External Services         |
                                   | Stripe • SMTP Mail Server |
                                   +---------------------------+


BELP follows a layered architecture where incoming requests pass through
routes, middleware, controllers, and services before interacting with the
database or publishing asynchronous jobs.

Time-consuming operations such as inventory reservation, invoice generation,
and email notifications are processed independently using BullMQ workers,
allowing the API to remain responsive and scalable.


## 🐳 Docker Architecture

The application is containerized using Docker Compose.

### Services

- Backend (Express.js)
- Worker (BullMQ)
- Redis
- MongoDB Atlas (Cloud)

### Architecture

```
                    User
                      │
                      ▼
                 Express Backend
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
      MongoDB Atlas            Redis
                                   │
                                   ▼
                              BullMQ Worker
                                   │
                                   ▼
                          Email Processing
```

### Start the application

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

View logs

```bash
docker compose logs
```

---

## Stripe Webhooks

Stripe requires a public HTTPS endpoint to deliver webhook events during local development.

Start an ngrok tunnel:

```bash
ngrok http 3000
```

Update the Stripe webhook endpoint to:

```
https://<your-ngrok-url>/webhook
```

Webhook Flow

```
Stripe
    │
    ▼
ngrok Tunnel
    │
    ▼
Express Backend
    │
    ▼
MongoDB Update
    │
    ▼
BullMQ Queue
    │
    ▼
Worker
```