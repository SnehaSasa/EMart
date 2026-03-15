# EMart


# eMart – Full Stack E-Commerce Platform

## Overview

eMart is a full-stack e-commerce web application that allows users to browse products, manage their cart, place orders, and track inventory in real time. The system is designed with a modern backend architecture using FastAPI and a dynamic frontend built with HTML, CSS, and JavaScript.

The platform includes features such as inventory management, order tracking, product categorization, and a scalable backend architecture with caching and containerization support.

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* FastAPI
* SQLAlchemy
* MySQL

### Infrastructure

* Docker
* Redis (Caching layer)

---

## Key Features

* User authentication
* Product catalog with categories
* Dynamic inventory management
* Shopping cart functionality
* Order placement and order history
* Out-of-stock detection
* Real-time inventory updates
* Backend API with FastAPI
* Redis caching for faster product queries
* Docker support for containerized deployment

---

## Project Structure

```
eMart
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   └── main.py
│
├── frontend
│   ├── pages
│   ├── js
│   ├── css
│   └── images
│
├── requirements.txt
└── README.md
```

---

## Running the Project Locally

### 1. Start the Backend

```
cd backend
uvicorn app.main:app --reload
```

Backend will run at:

```
http://localhost:8000
```

API documentation:

```
http://localhost:8000/docs
```

---

### 2. Run the Frontend

From the frontend folder:

```
python -m http.server 5500
```

Open the application:

```
http://localhost:5500
```

---

## Docker Support

The project includes Docker configuration for containerized deployment of the backend, frontend, and database services. Docker enables consistent environments across development and production systems.

Example command:

```
docker compose up --build
```

---

## Redis Caching

Redis is used as a caching layer to improve performance for frequently accessed product data. This reduces database load and speeds up product retrieval operations.

---

## Future Improvements

* Payment gateway integration
* Product search and filtering
* Recommendation system
* Admin dashboard
* CI/CD pipeline
* Deployment to cloud infrastructure

---

## Author

Sneha A
