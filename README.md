# Resilient Notification Gateway

## Overview
This project is a Node.js microservice designed to send notifications reliably using multiple providers with failover support.

---

## Features
- Provider failover (A → B)
- Idempotency using Redis
- Rate limiting (10 requests/min per user)
- Background job processing using BullMQ
- Structured logging
- Health check endpoint

---

## Tech Stack
- Node.js + Express
- Redis
- BullMQ
- TypeScript

---

## Setup

### 1. Install dependencies
npm install

### 2. Run Redis
docker run -d -p 6379:6379 redis

### 3. Run API
npm run dev

### 4. Run Worker
npm run worker

### OR

### 4. Run API and Worker Concurrently
npm run start:all

---

## API

### POST /notifications
```json
{
  "userId": "123",
  "type": "email",
  "message": "Hello"
}