# ShopEase – E-Commerce Product Catalogue & Visitor Analytics

## 1. Project Overview

ShopEase is a web-based product catalogue application developed using Java Spring Boot, MySQL, HTML, CSS and JavaScript.

The application allows customers to explore products while providing a separate administrative dashboard for monitoring visitor activity.

The project also includes a dynamic CSS Theme Generator that allows users to customize the appearance of the website.

## 2. Features

### Customer Website
- Browse available products.
- Search products by name.
- View individual product details.
- See product prices and images.
- Generate different website themes using the CSS Theme Generator.
- Save and retain the selected theme across pages using Local Storage.

### Admin Dashboard
- View total visitor records.
- Monitor the number of countries represented in visitor records.
- View simulated visitor statistics.
- Display visitor IP addresses, countries and timestamps.
- Refresh visitor data from the backend.

### Visitor Analytics Backend
- REST APIs for recording simulated visitors.
- IP address validation.
- Approximate country identification using the IPWho.is API.
- Store visitor information in MySQL.
- Retrieve visitor records through Spring Boot REST APIs.

**Note:** The current visitor analytics implementation supports simulated visitor records for testing. Automatic real-world visitor tracking and admin authentication are future improvements.

## 3. Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript
- Fetch API
- Local Storage

**Backend**
- Java 21
- Spring Boot
- Spring Data JPA
- Maven
- REST APIs

**Database**
- MySQL 8

**External API**
- IPWho.is – IP geolocation lookup.

**Development Tools**
- Visual Studio Code
- MySQL Workbench
- Git and GitHub

## 4. Project Structure

```text
ShopEase/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/shopease/backend/
│   │       │   ├── controller/
│   │       │   ├── entity/
│   │       │   ├── repository/
│   │       │   ├── service/
│   │       │   └── BackendApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── images/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── product.html
│   ├── product.js
│   ├── theme.js
│   ├── admin.html
│   ├── admin.css
│   └── admin.js
│
├── database/
│   ├── schema.sql
│   └── sample-data.sql
│
├── screenshots/
├── .gitignore
└── README.md
```

## 5. Prerequisites

Install the following software:

- Java JDK 21
- MySQL Server 8
- MySQL Workbench (optional)
- Git
- A modern web browser

## 6. Database Setup

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open and execute `database/schema.sql`.
4. Open and execute `database/sample-data.sql`.

This creates the `shopease_db` database and inserts five sample products.

The visitor table is managed through Spring Data JPA and Hibernate.

## 7. Backend Configuration

The backend uses the following environment variables:

| Variable | Description |
|---|---|
| `DB_URL` | MySQL database URL |
| `DB_USERNAME` | MySQL username |
| `DB_PASSWORD` | MySQL password |

Default database URL:

```text
jdbc:mysql://localhost:3306/shopease_db
```

Default username: `root`

Set your database password through an environment variable rather than hardcoding it in the source code.

## 8. Running the Application

### Start the Backend

Open PowerShell in the backend directory:

```powershell
cd backend
```

Set your MySQL password:

```powershell
$env:DB_PASSWORD="your_mysql_password"
```

Run the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend starts at:

```text
http://localhost:8080
```

### Start the Frontend

Open the following files in a web browser:

- `frontend/index.html` – Customer website.
- `frontend/admin.html` – Admin visitor analytics dashboard.

Make sure the backend is running before using either page.

## 9. API Endpoints

### Product APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/{id}` | Retrieve product by ID |
| GET | `/api/products?search=laptop` | Search products by name |

### Visitor APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/visitors` | Retrieve all visitor records |
| POST | `/api/visitors/simulate?ip=8.8.8.8` | Record one simulated visitor |
| POST | `/api/visitors/simulate/bulk` | Record multiple simulated visitors |

The visitor simulation endpoints accept IP addresses and use IPWho.is to retrieve approximate geolocation information.

## 10. Architecture

The application follows a three-layer backend architecture.

**Frontend Layer**

HTML, CSS and JavaScript provide the customer website and admin dashboard. The Fetch API communicates with the Spring Boot backend.

**Backend Layer**

Spring Boot handles REST API requests.

- Controller Layer: Handles incoming HTTP requests.
- Service Layer: Implements application business logic.
- Repository Layer: Communicates with the MySQL database using Spring Data JPA.

**Database Layer**

MySQL stores product and visitor information.

## 11. Screenshots

Application screenshots are available in the `screenshots/` directory.

Planned screenshots include:

- Customer Home Page
- Product Details Page
- CSS Theme Generator
- Admin Visitor Analytics Dashboard

## 12. Future Improvements

- Automatic real-world visitor tracking.
- Visitor analytics charts and geographical visualizations.
- Admin authentication and authorization.
- Product management through an admin panel.
- Shopping cart and order management.
- Improved dashboard analytics and reporting.

---

**Developed as a full-stack web development project using Java Spring Boot, MySQL and JavaScript.**