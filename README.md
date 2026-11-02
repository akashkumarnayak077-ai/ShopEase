# ShopEase – Product Catalogue Application

## 1. Project Overview

ShopEase is a simple product catalogue web application developed using Java Spring Boot, MySQL, HTML, CSS and JavaScript.

Users can:
- View all available products.
- Search products by name.
- View individual product details.
- See product prices and images.

## 2. Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Java 21
- Spring Boot
- Spring Data JPA
- Maven

**Database**
- MySQL 8

## 3. Project Structure

```text
ShopEase/
├── backend/
├── frontend/
│   ├── images/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── product.html
│   └── product.js
├── database/
│   ├── schema.sql
│   └── sample-data.sql
├── screenshots/
└── README.md
```

## 4. Prerequisites

Install the following:
- Java JDK 21
- MySQL Server 8
- MySQL Workbench (optional)
- Git

## 5. Database Setup

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open and execute `database/schema.sql`.
4. Open and execute `database/sample-data.sql`.

This creates the `shopease_db` database and inserts five sample products.

## 6. Backend Configuration

The backend uses these environment variables:

- `DB_URL` – MySQL database URL (default: `jdbc:mysql://localhost:3306/shopease_db`)
- `DB_USERNAME` – MySQL username (default: `root`)
- `DB_PASSWORD` – MySQL password

## 7. Running the Application

### Start the Backend

Open a terminal in the `backend` directory.

Set the database password in PowerShell:

```powershell
$env:DB_PASSWORD="your_mysql_password"
```

Run the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend starts at:

`http://localhost:8080`

### Start the Frontend

Open `frontend/index.html` in a web browser.

Make sure the backend is running before using the frontend.

## 8. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/{id}` | Retrieve product by ID |
| GET | `/api/products?search=laptop` | Search products by name |

## 9. Architecture

The application follows a simple three-layer architecture:

- **Frontend:** HTML, CSS and JavaScript provide the user interface and communicate with the backend using Fetch API.
- **Backend:** Spring Boot REST Controller handles API requests, the Service layer implements business logic, and the Repository layer accesses the database.
- **Database:** MySQL stores product information, including name, description, price and image path.

## 10. Screenshots

Application screenshots are available in the `screenshots/` directory.