# Campus Cache

A centralized platform for college students to quickly find syllabus, PYQs, and study resources without digging through WhatsApp groups.

---

## 🚀 Tech Stack

* **Frontend / Backend:** Next.js (App Router)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **UI:** Shadcn + Tailwind CSS
* **Auth:** Email & Password (custom)
* **File Storage:** Supabase Storage (PDFs)

---

## 🎯 Project Goal

Students often spam WhatsApp groups during exams asking for:

* syllabus
* previous year questions (PYQs)
* question banks

Campus Cache provides a **single searchable source of truth** for these resources.

---

## ✨ MVP Features (Phase 1)

### Public

* Browse resources by:

  * branch
  * year
  * subject
* Search resources by title
* View / download PDFs
* Responsive UI

### Admin

* Secure login
* Upload PDF resources
* Add metadata:

  * subject
  * year
  * branch
  * resource type

---

## 🧱 Project Structure

```
/apps/web
  /app
  /components
  /lib
  /actions
  /types

/prisma
  schema.prisma

```

---

## 🗄️ Database Schema (Initial)

### User

* id
* email
* passwordHash
* role (ADMIN | USER)
* createdAt

### Resource

* id
* title
* description
* branch
* year
* subject
* type (SYLLABUS | PYQ | NOTES | QB)
* fileUrl
* uploadedBy
* createdAt

---

## 🔐 Authentication Flow

1. User signs up with email/password
2. Password hashed using bcrypt
3. Session stored via cookies
4. Admin-only routes protected via middleware

---

## 📦 Environment Variables

Create `.env` in root:

```
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
```

---

## 🧪 Local Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Setup database

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### 3. Run dev server

```bash
pnpm dev
```

---

## 📤 File Upload Flow

1. Admin uploads PDF
2. File stored in Supabase bucket
3. Public URL saved in PostgreSQL
4. Resource appears in listings

---

## 🧠 Future Improvements (Phase 2+)

* Advanced filters
* Tag system
* Upvote/downvote resources
* Full-text search
* Semantic search (vector embeddings)
* "Most popular" section
* Contributor uploads

---

## 🚀 Deployment Plan

* **Frontend:** Vercel
* **Database:** Neon / Supabase Postgres
* **Storage:** Supabase Storage

---

## 📈 Success Metrics

* Number of resources uploaded
* Number of student users
* Search success rate
* Most downloaded subjects

---

## 🧑‍💻 Author

Dev Sharma

---

## 🪪 License

MIT
