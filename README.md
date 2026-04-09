# DocPilot

DocPilot is a Day 1 scaffold for an AI-powered document processing project that will later evolve into a contract analysis system.

## Tech Stack

- Backend: FastAPI + SQLAlchemy 2.0 + Alembic
- Frontend: Next.js + TypeScript
- Infra: Docker Compose with PostgreSQL, Redis, Qdrant

## Project Structure

- `backend/`: API service, settings, database wiring, migrations, and tests
- `frontend/`: Next.js app with a minimal home page and API helper
- `infra/`: lightweight infrastructure helpers and future local init assets
- `docker-compose.yml`: local dependency and app orchestration

## Day 1 Scope

The current scaffold focuses on:

- a runnable FastAPI service with `/api/v1/health`
- a minimal Next.js home page
- SQLAlchemy and Alembic base setup
- local Postgres, Redis, and Qdrant through Docker Compose

## Getting Started

### 1. Backend local setup

Use Python 3.13 through the Windows launcher:

```powershell
cd backend
py -3 -m venv .venv
.venv\Scripts\Activate.ps1
py -3 -m pip install --upgrade pip
py -3 -m pip install -e .
```

Run the API:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend local setup

```powershell
cd frontend
npm install
npm run dev
```

### 3. Docker Compose

```powershell
docker compose up --build
```

Services:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Qdrant: [http://localhost:6333](http://localhost:6333)

## Next Steps

- add the first document table and Alembic migration
- create an upload endpoint
- define a parse task flow
- add a simple document result view

