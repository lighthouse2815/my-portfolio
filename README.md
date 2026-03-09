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

## Deploy with GitHub Actions (GitHub Pages)

This repo already includes workflow: `.github/workflows/deploy-pages.yml`.

### 1. Enable Pages in repository settings

- Go to `Settings` -> `Pages`
- In `Build and deployment`, set `Source` = `GitHub Actions`

### 2. Push to `main`

Every push to `main` will:
- install dependencies
- build frontend (`npm run build:client`)
- deploy `dist/` to GitHub Pages

### 3. (Optional) Connect frontend to hosted backend

If your backend API is deployed separately, set repository variable:
- `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`
- Add variable: `VITE_API_BASE=https://your-backend-domain`

If not set, frontend will call relative `/api` and show offline notice when backend is unavailable.
