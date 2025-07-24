# 📦 Inventory Management System

A modern, full-stack inventory tracking system built with **Next.js 14**, **TypeScript**, **PostgreSQL**, and **Prisma**. It offers role-based access control, clean architecture, and developer-friendly documentation.Deployed on **[Vercel](https://vercel.com)** for blazing-fast hosting, preview deployments, and developer-friendly experience.

---

## ✨ Features

- 🔐 Authentication & Authorization (Admin, Manager, Viewer)
- 📦 Product & Category Management
- 📈 Stock Tracking (in/out)
- 📊 Role-based Dashboard
- 💡 Clean, modular codebase
- 📘 Daily progress journal for contributors

---

## 🧱 Tech Stack

| Layer      | Tech                                |
|------------|-------------------------------------|
| Frontend   | Next.js (App Router) + TypeScript   |
| Styling    | Tailwind CSS                        |
| Backend    | API Routes (REST)                   |
| Database   | PostgreSQL                          |
| ORM        | Prisma                              |
| Auth       | (Planned: NextAuth.js or JWT)       |
| Deployment | (Planned:Vercel / Railway)          |

---

## 🗂 Folder Structure (Work In Progress)

```
inventory-system/
├── app/           → App Router structure
├── components/    → Reusable UI
├── lib/           → DB and auth utils
├── prisma/        → DB schema & seed files
├── types/         → TS interfaces/enums
├── public/        → Assets
├── README.md      → This doc
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Rajesh562020/inventory-mgmt-nextjs.git
cd inventory-mgmt-nextjs
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Set Environment Variables

Create .env.local file based on .env.example:
```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database_name>
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```
### 4. Setup Database with Prisma

```
npx prisma db push
npx prisma studio
```

### 5. Start the Dev Server

```bash
npm run dev
```

Access: `http://localhost:3000`

---
### ☁️ Deployment on Vercel
```
    Step-by-step:
    Push your code to GitHub.

    Go to vercel.com, sign in with GitHub.

    Click "New Project" > Import your GitHub repo.

    Vercel will auto-detect Next.js.

    Set your environment variables in Project Settings > Environment Variables:

    DATABASE_URL

    NEXTAUTH_SECRET

    NEXTAUTH_URL → https://your-vercel-domain.vercel.app

    Click Deploy!
```
✅ Preview and production URLs will be created automatically.

### 📘 Docs

| Doc                     | Description                                  |
| ----------------------- | -------------------------------------------- |
| `/docs/PRD.md`          | Product Requirements Document                |
| `/docs/API.md`          | API Endpoint Reference (TBD)                 |
| `/docs/ARCHITECTURE.md` | Clean architecture & folder philosophy (TBD) |

## 🚧 Daily Progress Log

### ✅ Day 1 Summary

- Initialized project with Next.js + TypeScript
- Cleaned boilerplate
- Added Tailwind CSS, ESLint
- Created standard folder structure
- Setup .env files
- Created `README.md` and `PRD.md` in `/docs`


---

## 🧠 How to Contribute

- Follow clean code practices
- Document all modules
- Update the daily log before end-of-day
- Ask before introducing new dependencies

---

## 📜 License

MIT – Free for public use, improvement, and distribution.

---

### 👨‍💻 Author
    Rajesh Singh
    Full Stack Developer | MERN + Next.js | AWS + PostgreSQL

