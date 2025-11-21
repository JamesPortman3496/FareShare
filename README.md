# FareShare

FareShare is a monorepo for a shared‑expense app. It currently ships a Next.js web frontend and a lightweight Express backend. The structure stays small but is ready to grow as auth, data, and richer APIs land.

## 📦 Repository Structure

```
/
├── backend/      # Express server (health endpoint scaffold)
├── frontend/     # Next.js App Router frontend
└── README.md     # Project overview
```

### Frontend highlights
- App Router with a global shell in `components/AppShell.tsx`
- Navigation header components under `components/NavBar/`
- Dashboard experience under `src/app/dashboard` with group-specific routes at `/dashboard/group/[groupId]`
- Shared UI (Aurora background, modals, etc.) lives in `components/`

### Backend highlights
- Simple Express server (`backend/src/index.ts`) with `/health`
- Ready for future API expansion

## 🚀 Getting Started

### Clone
```bash
git clone https://github.com/your-username/FareShare.git
cd FareShare
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# visit http://localhost:3000
```

### Backend (Express)
```bash
cd backend
npm install
npm run dev   # or npm start
# health check: http://localhost:4000/health
```

Run frontend and backend in separate terminals.

## 🧱 Tech Stack
**Frontend:** Next.js, React, TypeScript, Tailwind (utility classes), next-themes  
**Backend:** Node.js, Express  
**Tooling:** npm, TypeScript

## 🗺️ Project Direction
Planned: real data persistence, auth, expense and settlement logic, richer API surface, and a shared component library. Contributions that improve stability, DX, or UX are welcome.***
