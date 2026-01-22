# Laravel Portfolio Website

A personal portfolio website built with Laravel featuring a custom admin CMS.

## Features
- Admin authentication
- Project CRUD management
- Testimonials linked to projects (one-to-many)
- Public-facing portfolio pages
- Relational database design using Eloquent

## Tech Stack
- Laravel
- PHP
- MySQL
- Blade
- Tailwind CSS
- Git & GitHub

## Setup (Local)
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

