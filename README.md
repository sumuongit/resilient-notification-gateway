# The Resilient Notification Gateway

## Overview
This project is a Node.js microservice designed to send notifications reliably using multiple providers with failover support.

## Features
- Provider failover (Primary → Secondary)
- Idempotency using Redis (Duplicate requests are blocked)
- Rate limiting using Redis (10 requests/minute per user)
- Structured logging using Winston
- Health-check endpoint for service and Redis monitoring

## Tech Stack
- Node.js + Express
- Redis
- BullMQ
- Winston
- TypeScript

## Architecture (High-Level)

Client → API → Middleware → Controller → Service (enqueue jobs) → Queue (BullMQ backed by Redis) → Worker (process jobs) → Primary Provider → Secondary Provider (failover)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run Redis
```bash
docker run -d -p 6379:6379 redis
```

### 3. Run API and Worker concurrently
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

### Example Logs (Observability)
- Provider Handling
```json
{"jobId":"1","level":"info","message":"Sent via secondary provider","service":"notification-service"}
```
- Idempotency
```json

{"key":"notification:2:Hello","level":"warn","message":"Duplicate request blocked","service":"notification-service","userId":"2"}
```
- Rate Limiting
```json
{"level":"warn","message":"Rate limit exceeded","service":"notification-service","userId":"2"}
```
- Health Check
```json
{"level":"info","message":"Health check called","service":"notification-service","uptime":24.1770609}
```

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

**Body (JSON): To check Idempotency**
```json
{
  "userId": "1",
  "message": "Hello",
  "type": "email"
}
```
**Body (JSON): To check Rate Limiting**
```json
{
  "userId": "1",
  "message": "msg{{$randomInt}}",
  "type": "email"
}
```
**Health-check Endpoint:**
GET http://localhost:3000/health

- This endpoint verifies that the service is running and that the Redis connection is healthy

**Response:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2026-03-20T10:00:00.000Z"
}
```
### Using Jest Test
- To check Provider Failover

```bash
npm test
```