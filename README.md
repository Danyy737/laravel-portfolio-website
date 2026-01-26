# Laravel Portfolio Website (Headless / API-First)

A **headless, API-first Laravel application** featuring a Blade reference frontend, a Sanctum-secured admin API, and a public read-only JSON API designed for multiple consumers.

The project is structured with clean validation, middleware-based authorization, and a decoupled architecture that allows new frontends (SPA or mobile) to be added without rewriting backend logic.

---

## Overview

This project began as a personal portfolio website and evolved into a **production-style Laravel backend** with multiple consumers.

The application exposes:
- A **public, read-only JSON API**
- A **Sanctum-protected admin API** for full CRUD operations
- A **Blade-based reference UI** that consumes the same database and models

Blade is treated as **one frontend client**, not the core of the system.  
All business logic, validation, and authorization live in the backend.

---

## Architecture Overview

This project follows a **headless / API-first architecture**.

- Backend logic is centralized in Laravel
- Multiple frontends can consume the same APIs
- No business logic is duplicated between clients

Current consumers:
- **Blade UI** (server-rendered reference frontend)
- **Postman** (API testing)
- **Future React SPA** (planned)

---

## Features

### Blade Reference Frontend (Public)
- Home, About, Projects, and Contact pages
- Projects displayed with associated testimonials
- Contact form with server-side validation and rate limiting
- Friendly feedback instead of hard 429 errors
- Old input preserved on validation errors

> The Blade UI reflects database and API changes automatically and exists primarily as a reference frontend.

---

## Screenshots

### Public Portfolio
![Projects Page](screenshots/projectspage.png)

### Admin – Projects CMS
![Admin Projects](screenshots/adminpanelprojects.png)

### Admin – Testimonials CMS
![Admin Testimonials](screenshots/adminpaneltestimonials.png)

## Authentication & Admin Access

- Authentication implemented using **Laravel Breeze**
- Admin access enforced via custom middleware (`EnsureAdmin`)
- Admin access rules:
  - Allowlisted email address, or
  - `users.is_admin = 1` flag

---

## Public API (Read-Only, No Auth)

The application exposes a **public JSON API** intended for frontend clients such as SPAs or mobile apps.

### Available Endpoints
- `GET /api/projects` — paginated list of projects
- `GET /api/projects/{project}` — single project
- `GET /api/projects/{project}?include=testimonials`
- `GET /api/projects/{project}/testimonials`

### API Characteristics
- Read-only (no authentication required)
- Pagination handled server-side
- `per_page` clamped between 1–50
- Responses formatted using **Laravel API Resources**
- Clean timestamp formatting


## Admin API (Sanctum-Protected)

All write operations are exposed **exclusively via authenticated API endpoints**.

### Authentication
- Token-based authentication using **Laravel Sanctum**
- Tokens issued and revoked via API endpoints
- Tokens tested using Postman

### Admin CRUD APIs
- Projects: create, update, delete
- Testimonials: create, update, delete
- Authorization enforced at middleware + controller level
- No write access exposed publicly

---

## Security & Validation

- Custom `EnsureAdmin` middleware
- Strict server-side validation using **Form Requests**
- Input whitelisting on all write operations
- Rate limiting applied to public endpoints
- Controllers kept thin and focused

---

## Project Structure (Simplified)
```bash
app/
- Http/
  - Controllers/
    - Admin/
    - Api/
  - Middleware/
  - Requests/
  - Resources/
- Models/
routes/
- web.php
- api.php
resources/
- views/
```
## Roadmap

- Public read-only API (done)
- Sanctum-protected admin API (done)
- Blade reference frontend (done)
- React SPA consuming public APIs
- React admin dashboard using Sanctum tokens
- API documentation (OpenAPI / Swagger)
- API response caching

---

## Local Setup

```bash
git clone https://github.com/Danyy737/laravel-portfolio-website.git
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
Visit http://127.0.0.1:8000 to view the application.

## Purpose of This Project

This project demonstrates:
- Headless / API-first Laravel architecture

- Secure token-based authentication

- Clean validation and authorization patterns

- Practical API design for real frontend consumers

- Scalable backend structure suitable for SPAs

It is intentionally built beyond a basic CRUD application to reflect real backend development practices.

## Author

Daniel Mourad  
Built for learning, experimentation, and growth as a backend developer.



