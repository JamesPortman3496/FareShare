# FareShare

FareShare is a small monorepo that hosts the code for a shared‑expense tracking app. The goal of this project is to provide a clear, modern structure that’s easy for contributors to understand and quick for new developers to spin up.

## 📦 Repository Structure

```
/
├── frontend/     # Next.js app (client-facing web app)
└── README.md     # Project overview and setup guide
```

At the moment, the main focus of the repo is the **frontend**, but the structure is designed to grow into a full stack project as the backend and supporting services evolve.

## 🚀 Getting Started

This guide helps you get the project running locally as quickly as possible.

### 1. Clone the repo

```bash
git clone https://github.com/your-username/FareShare.git
cd FareShare
```

### 2. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Then open your browser at:

```
http://localhost:3000
```

The app will reload automatically as you make changes.

## 🧱 Technology Stack

**Frontend**
- Next.js  
- React  
- TypeScript  
- Tailwind CSS (if added)

**Monorepo tooling**
- npm workspaces (optional future step)
- Simple directory‑based structure

This structure keeps things lightweight but leaves room for future expansion—API services, shared utilities, or a design system can be added without major restructuring.

## 🗺️ Project Direction

This project is being developed as a real‑world, portfolio‑ready application. Planned additions include:

- Backend API (Node/Express or Next.js API routes)
- Database integration  
- Auth and user management  
- Expense tracking logic  
- Shared components library  

As the project grows, the README will expand to cover each new area clearly.