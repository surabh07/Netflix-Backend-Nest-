# 🎬 Netflix Backend API

A Netflix-inspired backend service built using **NestJS**, focused on authentication, subscriptions, profiles, movies, watchlist, and watch history.

---

## 📌 Overview

This project is a **backend REST API** built with **NestJS**, following a **modular and scalable architecture**.

The system simulates core backend features of a streaming platform like Netflix, including:

- Secure user authentication
- Multi-profile support under a single account
- Movie catalog browsing
- Profile-based watchlist and watch history
- Subscription plans (without payment integration)

The project emphasizes **clean architecture**, **ownership-based authorization**, and **maintainability**.

---

## 🛠️ Tech Stack

### Runtime & Framework

- **Node.js**: `>= 18`
- **NestJS**: `v11.x`
- **Language**: TypeScript

### Database & ORM

- **Database**: PostgreSQL (MySQL compatible)
- **ORM**: Prisma

### Authentication & Security

- JWT Authentication
- Passport + `passport-jwt`
- `bcrypt` for password hashing

### Validation

- `class-validator`
- `class-transformer`
- **Joi** (used for configuration validation)

### API Documentation

- **Swagger (OpenAPI)**

### Testing

- **Jest**

---

## 📂 Folder Structure

```
src/
├── auth/
│   ├── dto/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── users/
├── profiles/
├── movies/
├── plans/
├── watchlist/
├── watch-history/
│
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── config.module.ts
│   └── index.ts
│
├── prisma/
│   └── prisma.service.ts
│
├── main.ts
└── app.module.ts
```

### Key Notes

- Feature-based modular architecture
- Clear separation: Controllers → Services → Database
- DTOs used for request validation
- Database access centralized using `PrismaService`
- Configuration isolated using a dedicated config module

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18`
- **npm**
- **PostgreSQL**
- (Optional) Prisma CLI

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/netflix_db
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=1d
```

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

---

## 🗄️ Database Setup (Prisma)

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## ▶️ Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## 📘 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:3000/api
```

JWT-protected routes can be tested using the **Authorize** button in Swagger.

---

## 🔑 Authentication Flow

- User logs in and receives a JWT
- JWT must be passed in headers for protected routes:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🚀 Core Features & APIs

### Auth

- `POST /auth/register`
- `POST /auth/login`

---

### Users

- `GET /users/me`
- `PATCH /users/me`
- `DELETE /users/me`

---

### Profiles (Multiple profiles per account)

- `POST /profiles`
- `GET /profiles`
- `DELETE /profiles/:id`

---

### Movies

- `GET /movies`
- `GET /movies/:id`

---

### Subscription Plans

- `GET /plans`
- `POST /plans/subscribe`
- `GET /plans/me`

---

### Watchlist (Profile-based)

- `POST /watchlist/:profileId/:movieId`
- `GET /watchlist/:profileId`
- `DELETE /watchlist/:profileId/:movieId`

---

### Watch History (Profile-based)

- `POST /history/:profileId/:movieId`
- `GET /history/:profileId`

---

## 🔐 Authentication & Authorization

- JWT-based authentication using Passport
- Ownership-based authorization enforced at service level
- Role-based guards intentionally deferred to avoid premature complexity

---

## ✔️ Validation & Error Handling

- Request validation using DTOs + `class-validator`
- Configuration validation using **Joi**
- Centralized exception handling via NestJS
- Consistent and meaningful HTTP error responses

---

## 🧱 Architecture Notes

- Controllers handle HTTP concerns only
- Services contain all business logic
- Database access is centralized and abstracted
- ORM (Prisma) can be replaced with minimal changes
- Designed for easy scalability and future enhancements

---

## ⚠️ Assumptions & Limitations

- No payment gateway integration
- No role-based access control (admin/user)
- Movies only (no seasons or episodes)
- No background jobs or queues
- No caching layer

These were intentionally kept out of scope to focus on core backend design.

---

## 🧪 Testing

```bash
npm run test
npm run test:e2e
```

---

## 🚀 Deployment Notes

- Environment-based configuration supported
- Suitable for containerization (Docker-ready)
- CI/CD friendly due to modular structure

---

## 👤 Maintainer

**Surabh Chaudhari**  
Backend Developer

---

## 📄 License

MIT License
