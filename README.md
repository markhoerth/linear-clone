# Linear Clone

A working Linear clone with a React frontend, TypeScript backend, and SQLite database. Built as part of the MCP Dev Summit NYC 2026 workshop.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────┐
│   Frontend  │────▶│   Backend    │────▶│  SQLite   │
│  React+Vite │     │ Express/TS   │     │  (sql.js) │
│  Port 3000  │     │  Port 3001   │     │  data.db  │
└─────────────┘     └──────────────┘     └──────────┘
```

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript with sql.js (pure JS SQLite)
- **Database**: SQLite via sql.js — file-persisted at `backend/data.db`

## Quick Start

### Running locally (no Docker)

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev   # Starts on port 3001

# Terminal 2: Frontend
cd frontend
npm install
npm run dev   # Starts on port 3000
```

Open http://localhost:3000 in your browser.

### Running with Docker Compose

```bash
docker compose up --build
```

Open http://localhost:3000.

### Running multiple instances (different ports)

```bash
FRONTEND_PORT=3010 BACKEND_PORT=3011 DB_PORT=5433 docker compose up --build
```

## Features

- **Team View**: Lists all issues grouped by status (Todo, Backlog, In Progress, Done)
- **Issue Detail**: Click any issue to view/edit title, description, status, and priority
- **Create Issue**: Modal dialog for creating new issues with auto-generated identifiers
- **Delete Issue**: Remove issues from the detail view
- **Inline Editing**: Title and description auto-save on blur
- **Status Management**: Change status/priority via dropdown selects

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | List all issues |
| GET | `/api/issues/:id` | Get single issue |
| POST | `/api/issues` | Create new issue |
| PUT | `/api/issues/:id` | Update issue |
| DELETE | `/api/issues/:id` | Delete issue |
