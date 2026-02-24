# Flowra
Flowra is a leightweight, extensible ERP system for smnall to medium-sized service businesses. It helps manage invoices, projects and time tracking - without unnecessary complexity. 

## Why Flowra 
Many small businesses rely on spreadsheets, documents and chat messages for daily operations. Flowra provides a structured system that is fast to set up and easy to use. 

## MVP Features 
- Customers & projects
- Invoicing (create offers, convert to invoices, track payment status)
- Time tracking (per project / employee)
- Budget tracking 

## Tech Stack
- Backend: Node.js, Express, TypeScript, PostgresSQL (planned)
- Frontend: React, TypeScript, Tailwind CSS (planned)

## Architecture 
Layered architecture (Enterprise-style):
Routes -> Controllers -> Services -> Repositories -> Database

## Project Structure 
- /backend API (Node.js + Express + TypeScript)
- /frontend Web app (React + TS + Tailwind)
- /docs Requirements, workflows, architecture notes

## Local Development 

### Backend
```bash 
cd backend 
npm install
npm run dev
```
