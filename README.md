Albania Foods REST-API
Project Overview

This project is a REST API for Albanian foods. It allows users to fetch, create, update, and delete traditional Albanian dishes.

Public GET endpoints for reading data

Protected POST, PUT, DELETE endpoints using Basic Auth

All data is returned in JSON format

Fully documented and tested with Postman

Features

View all foods or a single food item

Add, update, or delete foods (requires Basic Auth)

Clear error messages for invalid requests or authentication

MySQL database with at least 20 food items

Database
Database Name:

edosha20_albania_foods

Table: foods
Field	Type	Description
id	INT PRIMARY KEY AUTO_INCREMENT	Unique ID
name	VARCHAR(100)	Name of the dish
region	VARCHAR(100)	Region of Albania
type	VARCHAR(50)	Type: main dish, dessert, street food, etc.
ingredients	TEXT	List of ingredients
description	TEXT	Short description
calories	INT	Calories per serving
prep_time_min	INT	Preparation time in minutes

Example entry:

{
  "id": 1,
  "name": "Tavë Kosi",
  "region": "Elbasan",
  "type": "main dish",
  "ingredients": "lamb, yogurt, eggs",
  "description": "Baked lamb with yogurt",
  "calories": 450,
  "prep_time_min": 90
}
REST API Endpoints
Public Endpoints (no auth)

GET /api/foods → Get all foods

GET /api/foods/:id → Get a single food by ID

Protected Endpoints (Basic Auth required)

POST /api/foods → Create a new food

PUT /api/foods/:id → Update a food by ID

DELETE /api/foods/:id → Delete a food by ID

If authentication fails: returns 401 Unauthorized

HTTP Status Codes

200 OK → Successful GET/PUT

201 Created → Successful POST

204 No Content → Successful DELETE

400 Bad Request → Invalid input

401 Unauthorized → Missing or wrong Basic Auth

404 Not Found → Food not found

Error responses are in JSON format:

{
  "error": "Descriptive error message"
}
Authentication

Basic Auth required for POST, PUT, DELETE

Example credentials (provided in a separate text file):

Username: edona
Password: password123
Setup Instructions

Clone the repository:

git clone <your-repo-url>
cd albania-foods-api
npm install

Create .env file with database info:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=edosha20_albania_foods
PORT=5173
BASIC_AUTH_USER=edona
BASIC_AUTH_PASS=password123

Run the SvelteKit project:

npm run dev

Test endpoints with Postman or cURL

Example cURL GET request:

curl http://localhost:5173/api/foods
Git Workflow

Make small, frequent commits (at least 2 per hour)

Commit messages in English, e.g.:

Add GET /api/foods endpoint

Implement Basic Auth for POST, PUT, DELETE

Seed database with 20 Albanian foods

Postman Collection

Fully tested endpoints

Exported JSON included in the repository

Each request includes descriptions and example responses