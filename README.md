<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A Netflix-inspired backend application built using NestJS and Prisma,
  focusing on authentication, subscriptions, profiles, movies, watchlist,
  and watch history.
</p>

---

## 📌 Project Overview

This project is a **Netflix-style backend API** built with **NestJS** and **Prisma**.  
It supports:

- User authentication using JWT
- Multiple profiles per account
- Movie catalog browsing
- Watchlist per profile
- Watch history per profile
- Subscription plans (without payment integration)

---

## 🛠️ Tech Stack

### Runtime & Framework

- **Node.js**: `v24.12.0`
- **NestJS**: `v11.0.14`
- **Prisma**: `v7.2.0`
- **TypeScript**: `v5.9.3`

### Database & ORM

- **Prisma ORM**
- **PostgreSQL / MySQL** (any SQL DB supported by Prisma)

### Authentication & Security

- **JWT** (`@nestjs/jwt`)
- **Passport & passport-jwt**
- **bcrypt** (password hashing)

### Validation

- **class-validator**
- **class-transformer**
- **Joi** (used for schema-based validation where required)

---

## 📦 Packages Used

```bash
@nestjs/common
@nestjs/core
@nestjs/platform-express
@nestjs/jwt
@nestjs/passport
passport
passport-jwt
bcrypt
prisma
@prisma/client
class-validator
class-transformer
joi
```
