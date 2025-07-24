# 📄 Inventory Management System – Project Requirement Document

## 🎯 Objective

Build a production-ready, scalable Inventory Management System using **Next.js 14**, **TypeScript**, **PostgreSQL**, and **Prisma ORM** with clean architecture, role-based access, and full documentation.

---

## 🧩 Core Features

1. **Authentication & Authorization**
   - User roles: Admin, Manager, Viewer
   - Auth strategy: JWT or NextAuth.js (TBD)

2. **Inventory Management**
   - Products: CRUD, assign categories
   - Categories: CRUD
   - Stock levels: quantity, in/out logs

3. **Dashboard**
   - Role-based dashboard
   - Summaries: Total Products, Low Stock, etc.

4. **User Management**
   - Admin can manage users
   - Assign roles

5. **API Design**
   - RESTful APIs for all entities
   - Pagination, filtering, and sorting

6. **Database**
   - PostgreSQL schema using Prisma
   - Migrations & seeding

7. **UI/UX**
   - Built with TailwindCSS
   - Mobile responsive design

---

## 🧱 Architecture Plan

```

inventory-system/
├── app/           → Next.js App Router
├── components/    → Reusable UI components
├── lib/           → Auth, DB helpers
├── prisma/        → DB schema & migrations
├── types/         → TypeScript interfaces & enums
├── public/        → Static files
├── .env           → Env vars
├── README.md      → Public docs for contributors

```

---

## 🔧 Tech Stack

- **Frontend**: Next.js (App Router) + Tailwind CSS + TypeScript
- **Backend**: TypeScript API Routes
- **Auth**: NextAuth.js or JWT
- **Database**: PostgreSQL + Prisma
- **Hosting (optional)**: Vercel (frontend), Railway (PostgreSQL)

---

## 🎓 Learning Outcomes

- Clean project architecture and folder structures
- Prisma schema modeling and migrations
- Type-safe API development
- Secure role-based authentication
- Writing scalable and readable code
- Documenting daily progress like a team lead

---

## ✅ Phase Plan

### Phase 1 – Boilerplate Setup (✅ Done)
- Next.js 14 + TypeScript setup
- TailwindCSS + ESLint + Prettier config
- Folder structure
- `README.md` initialized

### Phase 2 – DB + Auth Setup
- Setup PostgreSQL (local or Railway)
- Design schema using Prisma
- Add NextAuth.js or JWT auth
- Role-based middleware protection

### Phase 3 – Product & Category Modules
- Build product APIs and pages
- Build category APIs and pages
- Add filtering, sorting

### Phase 4 – Stock Management
- Track stock in/out history
- Update product quantity
- Alert for low stock

### Phase 5 – Dashboard & User Management
- Dashboard UI for Admin/Manager
- User list, role editing
- Final polishing

---

## 📆 Daily Commit Rule

> Each day ends with updated documentation in `README.md`, commits with clear messages, and task review.

---

## 📌 Notes to Self

- Never skip documenting
- Don’t rush features — understand architecture
- Keep code clean and modular
- Ask Jacky if stuck or unclear


