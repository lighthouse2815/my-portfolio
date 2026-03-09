# Gaming-Style Portfolio (React + TypeScript + Vite + REST API)

Modern personal portfolio with a futuristic gaming UI, animated loading screen, neon theme, backend visitor analytics, and comment system.

## Stack

- Frontend: React + TypeScript + Vite + Framer Motion
- Backend: Node.js + Express + TypeScript
- Persistence: Lowdb JSON file database (`server/data/portfolio-db.json`)

## Features

- 2.6s animated loading screen with progress bar and staged status text
- Hero, About, Skills, Projects, Achievements, Analytics, Comments, Contact sections
- Gaming UI design: neon glow, dark futuristic palette, animated borders/buttons
- Animated background particles + subtle cyber grid
- Scroll-based reveal animations and smooth section transitions
- Animated skill progress bars
- Project cards with hover glow and border animations
- Custom glow cursor (desktop/fine pointer)
- Easter egg: click avatar 5 times to unlock achievement toast
- Visitor analytics:
  - count visitors
  - store visit timestamps
  - 7-day activity visualization
- Comment system:
  - submit name + message
  - persistent storage
  - newest-first display

## Run Locally

1. Install root dependencies:

```bash
npm install
```

2. Install server dependencies:

```bash
npm --prefix server install
```

3. Start frontend + backend together:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## Scripts

- `npm run dev`: run client and server concurrently
- `npm run build`: build client + server
- `npm run lint`: lint all TypeScript/TSX files
- `npm run preview`: preview Vite production build

## API Endpoints

- `GET /api/health` -> health check
- `POST /api/visitors` -> record visit and return aggregated stats
- `GET /api/visitors/stats?days=7` -> total + recent daily stats
- `GET /api/comments` -> list comments (newest first)
- `POST /api/comments` -> add a comment (`name`, `message`)

## Notes

- Vite proxies `/api` calls to `http://localhost:4000` during development.
- The database file is ignored by git via `.gitignore`.

## Deploy Frontend + Backend

### Frontend (GitHub Pages)

Workflow: `.github/workflows/deploy-pages.yml`

1. Go to `Settings` -> `Pages`
2. In `Build and deployment`, set `Source` = `GitHub Actions`
3. Push to `main`

### Backend (Render)

This repo includes:
- `render.yaml`
- `server/.env.example`
- workflow `.github/workflows/deploy-backend-render.yml` (triggered by Render deploy hook)

Steps:

1. Create a new Render Web Service from this GitHub repo
2. Render will detect `render.yaml`
3. In Render, copy your **Deploy Hook URL**
4. In GitHub repo, set secret:
   - `Settings` -> `Secrets and variables` -> `Actions` -> `Secrets`
   - `RENDER_DEPLOY_HOOK_URL=<your render deploy hook>`
5. Push to `main` (or manually run workflow `Deploy Backend to Render`)

### Connect Frontend to Backend

After backend is live (example: `https://my-portfolio-api.onrender.com`):

1. In GitHub repo, set variable:
   - `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`
   - `VITE_API_BASE=https://my-portfolio-api.onrender.com`
2. Push to `main` or rerun workflow `Deploy Portfolio to GitHub Pages`

Important:
- `VITE_API_BASE` should be domain only, **without `/api`** suffix.
- For CORS, backend reads `CORS_ORIGIN` (see `server/.env.example`).
- Lowdb stores data in local file; on free cloud instances data can reset on redeploy/restart.
