# AyuSetu Full Setup Guide

This file explains exactly what to install, which env files to create, what to edit, and what commands to run.

## 1. Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+
- MongoDB (local install or MongoDB Atlas)
- Git

Quick checks:

Windows PowerShell:

node -v
npm -v

## 2. Project Structure

- Backend API: [backend](backend)
- Frontend app: [frontend](frontend)
- Backend env template: [backend/.env.example](backend/.env.example)
- Frontend env template: [frontend/.env.example](frontend/.env.example)

## 3. Environment Configuration

### 3.1 Backend env

Create a new file named .env inside [backend](backend) by copying [backend/.env.example](backend/.env.example).

Required values to change:

- JWT_SECRET
  - Replace with a strong random secret.
- MONGO_URI
  - Local Mongo example:
    - mongodb://127.0.0.1:27017/ayusetu
  - Atlas example:
    - mongodb+srv://<username>:<password>@<cluster-url>/ayusetu

Usually keep these defaults during local development:

- PORT=5000
- NODE_ENV=development
- WEB_URL=http://localhost:5173
- CORS_ORIGIN=http://localhost:5173
- JWT_EXPIRES_IN=7d

Optional AI settings (only if you want external AI provider calls):

- OPENAI_API_KEY
- OPENAI_MODEL (default: gpt-4o-mini)
- OPENAI_BASE_URL (default: https://api.openai.com/v1)

### 3.2 Frontend env

Create a new file named .env inside [frontend](frontend) by copying [frontend/.env.example](frontend/.env.example).

Required/important values:

- VITE_API_URL
  - For local run with backend on same machine:
    - http://localhost:5000/api

## 4. Install Dependencies

From project root:

cd backend
npm install

cd ../frontend
npm install

## 5. Run the Project (Local Dev)

Open two terminals.

Terminal 1 (backend):

cd backend
npm run dev

Expected startup:

- MongoDB connected
- Server on port 5000

Terminal 2 (frontend):

cd frontend
npm run dev

Expected startup:

- Vite dev server URL (usually http://localhost:5173)

## 6. Quick Health Checks

Backend health endpoint:

- GET http://localhost:5000/health

Frontend to backend wiring check:

1. Open frontend
2. Register or login from Login page
3. Submit symptoms from Symptom Input page
4. Verify Dashboard loads symptom history and appointments
5. Open doctor profile and book an appointment

## 7. Common Issues and Fixes

- 401 Unauthorized after login
  - Ensure token exists in localStorage key token.
  - Ensure backend JWT_SECRET is set and stable.

- CORS errors in browser
  - Ensure backend CORS_ORIGIN matches frontend URL.
  - Ensure frontend VITE_API_URL points to the same backend.

- Mongo connection failure
  - Verify MONGO_URI is correct.
  - If local Mongo, make sure MongoDB service is running.

- Port conflicts
  - Change backend PORT in backend/.env and update frontend VITE_API_URL accordingly.

## 8. Production-style Start (Backend)

From [backend](backend):

npm run start:prod

This uses cross-env and sets NODE_ENV=production in a Windows-compatible way.

## 9. What Is Already Wired

Implemented and connected now:

- Auth login/register and token persistence
- Symptom submission to backend analysis
- Patient dashboard reads backend symptom history and appointments
- Doctor listing/profile/availability from backend
- Appointment booking from doctor profile
- Doctor dashboard appointment status updates
- Route-level validation coverage expanded on backend routes
