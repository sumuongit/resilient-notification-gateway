# The Resilient Notification Gateway

## Overview
This project is a Node.js microservice designed to send notifications reliably using multiple providers with failover support.

## Features
- Provider failover (Primary → Secondary)
- Idempotency using Redis
- Rate limiting using Redis (10 requests/min per user)
- Structured logging using Winston and a Health-check endpoint

## Tech Stack
- Node.js + Express
- Redis
- BullMQ
- Winston
- TypeScript

## Architecture (High-Level)

Client → API → Middleware → Controller → Service (enqueue jobs) → Queue (Redis/BullMQ) → Worker (process jobs) → Primary Provider → Secondary Provider (failover)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run Redis
```bash
docker run -d -p 6379:6379 redis
```

### 3. Run API and Worker Concurrently
```bash
npm run start:all
```

## API

### POST /notifications
```json
{
  "userId": "1",  
  "message": "Hello",
  "type": "email"
}
```

### Response
- `202 Accepted` – Notification queued successfully

### Using cURL
```bash
curl -X POST http://localhost:3000/notifications \
-H "Content-Type: application/json" \
-d '{"userId":"1","message":"Hello","type":"email"}'
```

### Using Postman 
**Endpoint:**
POST http://localhost:3000/notifications

**Headers:** 
Content-Type: application/json

**Body (JSON):**
```json
{
  "userId": "1",
  "message": "Hello",
  "type": "email"
}
```

### Using Jest Test
```bash
npm test
```