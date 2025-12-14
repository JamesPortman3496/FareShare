# FareShare

FareShare is a shared-expense app. The monorepo contains a Next.js App Router frontend and a lightweight Express backend. The current build includes mock groups/expenses, animated UI, and a placeholder credentials-based auth flow (NextAuth) with a demo user.

## 📦 Repository Structure

```
/
├── backend/      # Express server (health endpoint scaffold)
├── frontend/     # Next.js App Router frontend (NextAuth + mock data)
└── README.md     # Project overview
```

### Frontend highlights
- App Router with a global shell in `src/components/layout/AppShell.tsx`
- NextAuth wiring (credentials) with a demo account; session-aware nav and account dropdown
- Sign-in/up UI with password visibility toggles and demo credentials support
- Dashboard experience at `/dashboard` with group routes `/dashboard/group/[groupId]` backed by mock expenses (holiday trip, house share, weekend away)
- Account settings page (`/account`) with prefilled profile fields from the signed-in session
- Shared UI (Aurora background, modals, etc.) in `src/components`

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

#### Auth notes
- Default credentials (demo): `demo@fareshare.app` / `password123` (configurable via `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`).
- Set `NEXTAUTH_SECRET` in `frontend/.env.local` (use `openssl rand -base64 32` to generate).
- Current Credentials provider is placeholder-only; replace `authorize` with real backend calls when available.

### Backend (Express)
```bash
cd backend
npm install
npm run dev   # or npm start
# health check: http://localhost:4000/health
```

Run frontend and backend in separate terminals.

## 🧱 Tech Stack
**Frontend:** Next.js (App Router), React, TypeScript, Tailwind-style utility classes, next-themes, NextAuth  
**Backend:** Node.js, Express  
**Tooling:** npm, TypeScript

## 🗺️ Project Direction
Planned: real data persistence, production-ready auth, expense and settlement logic, richer API surface, and shared component library. Contributions that improve stability, DX, or UX are welcome.
