# Order Processing System

Production-grade asynchronous order processing backend built with
Node.js, Express, MongoDB, Redis, and BullMQ.

## Features

- RESTful Order API
- Asynchronous Email Processing
- BullMQ Queue
- Redis
- Worker Architecture
- Centralized Error Handling
- Layered Architecture

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Redis
- BullMQ
- Nodemailer
- Docker

## Architecture

(Architecture Diagram)

## Project Structure

...

## API Endpoints

POST /api/v1/orders

## Setup

npm install
docker compose up
npm run dev

## Future Improvements

Retries
Dead Letter Queue
Bull Board
Kafka
...


                Client
                   │
                   ▼
             Express API
                   │
          ┌────────┴────────┐
          ▼                 ▼
      MongoDB         BullMQ Queue
                            │
                            ▼
                         Redis
                            │
                            ▼
                        Worker
                            │
                            ▼
                    Email Service
                            │
                            ▼
                         Gmail SMTP

Client

↓

POST /orders

↓

Controller

↓

Service

↓

Save Order

↓

Queue Job

↓

201 Created

──────────────────────────────

Worker

↓

Read Job

↓

Send Email

↓

Complete


Project Structure:
controllers/
Receives HTTP requests.

services/
Contains business logic.

queues/
Defines BullMQ queues.

workers/
Processes background jobs.

config/
Infrastructure configuration.

middleware/
Application-wide middleware.

models/
Database schema definitions.