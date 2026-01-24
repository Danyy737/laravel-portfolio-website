# Laravel Portfolio Website

A full-stack portfolio application built with Laravel, featuring a public website, a secure admin CMS, and a scalable public JSON API. The project is structured with clean validation, middleware-based security, and future extensibility in mind.

## Overview

This project began as a personal portfolio website and evolved into a production-style Laravel application.

It includes:
- Public-facing pages built with Blade
- Authentication and an admin content management system
- Clean server-side validation using Form Requests
- Rate-limited public forms
- A public read-only API designed for future frontend clients (SPA or mobile)

The focus of this project is not just presentation, but building a maintainable and scalable backend architecture.

## Features

### Public Website
- Home, About, Projects, and Contact pages
- Projects displayed with associated testimonials
- Contact form with server-side validation and rate limiting
- Friendly feedback instead of a hard 429 error
- Old input preserved on validation errors

## Screenshots

### Public Portfolio
![Projects Page](screenshots/projectspage.png)

### Admin – Projects CMS
![Admin Projects](screenshots/adminpanelprojects.png)

### Admin – Testimonials CMS
![Admin Testimonials](screenshots/adminpaneltestimonials.png)

### Authentication and Admin CMS
- Authentication implemented using Laravel Breeze
- Admin dashboard protected by custom middleware
- Admin access rules:
  - Allowlisted email address, or
  - is_admin = 1 flag on the user
- Admin CRUD functionality for projects and testimonials

### Security and Validation
- Custom EnsureAdmin middleware protecting admin routes
- Rate limiting applied to public endpoints
- Form Request classes used for all create and update actions
- Controllers kept clean and focused
- Strict server-side validation and input whitelisting

## Public API (Read-Only)

The application exposes a public JSON API to support future frontend clients such as React, Vue, or mobile applications.

Available endpoints:
- GET /api/projects – paginated list of projects
- GET /api/projects/{id} – single project
- GET /api/projects/{id}?include=testimonials – project with testimonials included
- GET /api/projects/{id}/testimonials – testimonials for a project

Pagination is handled server-side using query parameters such as per_page and page. The per_page value is clamped between 1 and 50 to prevent abuse.

Example request:
- /api/projects?per_page=5&page=2

Example response structure:
- data: array of project objects
- meta: pagination information including current_page, per_page, and total

## Architecture Notes

- Blade is used for server-rendered public pages
- Controllers are thin and delegate logic appropriately
- Business rules enforced through middleware and Form Requests
- API responses formatted using Laravel Resources
- Feature-based Git workflow with branches merged into main

## Project Structure (Simplified)

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

## Local Setup

Clone the repository, install dependencies, and run the application locally:

- git clone https://github.com/Danyy737/laravel-portfolio-website.git
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- php artisan serve

Visit http://127.0.0.1:8000 to view the application.

## Future Improvements

- Admin write API using Laravel Sanctum
- OAuth login (Google)
- API documentation using OpenAPI or Swagger
- SPA frontend using React or Vue
- API response caching

## Purpose of This Project

This project demonstrates:
- Real-world Laravel application structure
- Secure routing and data handling
- Clean validation and authorization
- Practical API design
- Proper Git workflow and version control

It is intentionally built beyond a basic CRUD application to reflect real backend development practices.

## Author

Daniel Mourad  
Built for learning, experimentation, and growth as a backend developer.



