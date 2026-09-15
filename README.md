# Lost & Found Application

A web-based Lost & Found Application developed for college/institution use. The application allows users to register and log in, report lost or found items, search and filter reported items, and view their own reports.

## Features

* User Registration and Login
* Secure password storage using BCrypt
* Report Lost Items
* Report Found Items
* Category and Contact details
* Search and filter items
* My Reports section
* Lost/Found status
* Date and location details
* Chatbot assistance
* Responsive and user-friendly interface

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security

### Database

* MySQL

## Project Structure

```text
LOSTFOUND
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── lostandfound
    ├── src
    │   └── main
    │       └── java
    └── pom.xml
```

## How It Works

1. A user registers and logs into the application.
2. The user can report a lost or found item.
3. Item details such as name, category, description, location, date and contact are stored in the MySQL database.
4. Users can browse, search and filter reported items.
5. Logged-in users can view their submitted reports through the My Reports section.
6. The chatbot provides basic assistance for navigating the Lost & Found application.

## Security

* Passwords are stored using BCrypt hashing.
* Duplicate email registration is prevented.
* Login credentials are verified against the stored BCrypt password.
* REST API endpoints are configured using Spring Security.

## Database

The application uses MySQL with the database:

`lost_and_found_db`

The backend communicates with the database using Spring Data JPA.

## Future Scope

* Admin dashboard
* College ID-based verification
* Improved item matching
* Image upload for lost and found items
* Email or notification alerts
* Stronger authentication and authorization

## Author

**Diksha**

B.Tech Computer Science Engineering
Bhopal, India
