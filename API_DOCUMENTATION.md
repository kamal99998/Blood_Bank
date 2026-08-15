# Blood Bank API Documentation

## Overview
This is a Node.js MVC REST API for a Blood Bank Management System. It uses MySQL (Dockerized) and supports full CRUD operations.

## Setup Instructions
1. Run `docker compose up -d` to start the MySQL database. It will auto-initialize the schema and seed data.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server using nodemon.

## CI/CD Pipeline
This project is configured with GitHub Actions (`.github/workflows/ci.yml`). On every push to main, it will:
1. Spin up a MySQL service container
2. Initialize the database schema
3. Run the automated Jest + Supertest suite (`npm test`)

## API Endpoints

### Users (`/users`)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` (or `/users/register`) - Create a new user
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Delete a user

### Donors (`/donors`)
- `GET /donors` - Get all donors (Query params: `?blood_group=A+&is_available=true`)
- `GET /donors/:id` - Get donor by ID
- `POST /donors` (or `/donors/register`) - Register a donor
- `PUT /donors/:id` - Update donor
- `DELETE /donors/:id` - Delete donor

### Requests (`/requests`)
- `GET /requests` - Get all blood requests
- `GET /requests/:id` - Get request by ID
- `GET /requests/donor/:donorId` - Get requests by donor
- `GET /requests/requester/:requesterId` - Get requests by requester
- `POST /requests` - Create a new blood request
- `PUT /requests/:id` - Update a request
- `PATCH /requests/:id/status` - Update request status (Pending, Accepted, Rejected, Cancelled)
- `DELETE /requests/:id` - Cancel a request
