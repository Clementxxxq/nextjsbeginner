# Address Book Web Application

This is a project for building an address book application using
**Next.js**, **Prisma**, and **Prisma Cloud**.

At the moment, the project focuses on **project setup, deployment, and database connection**.
The API and CRUD features are planned and listed as TODO.

🌐 Live Demo
👉 https://nextjsbeginner-swart.vercel.app//

---

## 🚀 Tech Stack

- **Next.js** – Frontend framework
- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **Prisma Cloud** – Cloud database
- **Vercel** – Deployment platform

---

## ✅ What Has Been Completed

### 1️⃣ Project Initialization

- Created a new **Next.js project**
- Installed required dependencies
- Verified the project runs locally

---

### 2️⃣ Frontend Setup

- Modified the default **homepage**
- Cleaned unused boilerplate code
- Prepared the project structure for future features

---

### 3️⃣ Deployment (Vercel)

- Connected the project to **Vercel**
- Successfully deployed the website
- The application is live at:

👉 **https://vercel.com/** (deployment platform)

> Automatic deployment is triggered on every push to the repository.

---

### 4️⃣ Prisma Setup

- Installed **Prisma**
- Initialized Prisma in the project
- Created the Prisma schema

---

### 5️⃣ Prisma Cloud Database

- Connected the project to **Prisma Cloud**
- Configured environment variables:
  - `DATABASE_URL`
- Generated Prisma Client successfully

---

### 6️⃣ Database Model

The `Contact` model has been defined as follows:

```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  email     String?
  address   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
---

## 🛠️ TODO (In Progress / Planned)

- [x] ~~Create Next.js project~~
- [x] ~~Deploy to Vercel~~
- [x] ~~Connect Prisma + Cloud DB~~

- [x] ~~Create RESTful API routes~~
- [x] ~~Connect API routes to Prisma Client~~
- [x] ~~Implement CRUD operations~~
  - [x] ~~Create contact~~
  - [x] ~~Read contacts~~
  - [x] ~~Update contact~~
  - [x] ~~Delete contact~~

- [x] ~~Contact list page~~
- [x] ~~Add contact form~~
- [x] ~~Edit contact~~
- [x] ~~Delete contact~~
- [x] ~~Reset auto-increment ID~~
- [x] ~~Basic UI improvements~~
- [x] ~~Contact list pagination~~
- [x] ~~Search function~~
- [ ] API tests
---

## 🧠 What I Learned

- How to create and structure a Next.js project
- How to deploy a website using Vercel
- How to connect a cloud database using Prisma
- How frontend, backend, and database work together
- How to plan a project step by step instead of building everything at once