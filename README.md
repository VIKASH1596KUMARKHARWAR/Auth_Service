# AirTicket Auth Service

This repository contains the **Authentication & Authorization Service** for the AirTicket backend.  
It handles **user registration, login, and role-based access control** without using third-party auth libraries.

## Related Projects / Services

- [AirTicket API Gateway](https://github.com/VIKASH1596KUMARKHARWAR/AirTicket_API_GATEWAY)

- [AirTicket Flight Service](https://github.com/VIKASH1596KUMARKHARWAR/FlightAndSearchService)

- [AirTicket Booking Service](https://github.com/VIKASH1596KUMARKHARWAR/AirTicket_BookingService)

- [AirTicket Remainder Service](https://github.com/VIKASH1596KUMARKHARWAR/AirTicket_RemainderService)

## Overview

- Built using **Node.js** with **Sequelize ORM** for MySQL database integration.
- Implements **user authentication and role-based authorization** from scratch.
- Supports **Admin, Staff, and User roles**, controlling access to different services.
- Works with the **API Gateway** to protect routes and validate user permissions.
- Uses a modular structure for maintainable, readable code.
- Assets (like user avatars or documentation images) can be placed in the `assets` folder.

---

## Architecture

API Gateway → Auth Service → MySQL Database
↑
Role-based access checks for other services (Booking, Flight, etc.)

---

## Key Features

- **User Authentication**:

  - Register new users with hashed passwords.
  - Login with username/email and password validation.

- **Role-Based Authorization**:

  - Assign roles to users (Admin, Staff, User).
  - Protect routes based on user roles.
  - Ensure users only access permitted resources.

- **Database Integration**:

  - Sequelize ORM models for Users, Roles, and Permissions.
  - MySQL handles persistent storage and relationships.

- **Modular Code Structure**:

  - Separate modules for controllers, routes, and models.
  - Clear folder structure for authentication logic and utilities.

- **Asset Management**:
  - Email templates, avatars, or documentation images can be stored in the `assets` folder.

---

## Learning Outcomes

- Learned to implement **authentication and authorization from scratch**.
- Gained hands-on experience with **role-based access control** in Node.js.
- Managed **Sequelize ORM models** and relationships in MySQL.
- Integrated Auth Service securely with API Gateway and other microservices.
- Developed a **modular, scalable authentication system** without external libraries.

---

This README highlights:

- **Auth & RBAC logic from scratch**
- **Database + ORM usage**
- **Integration with API Gateway and other services**
- Optional **assets for diagrams or flows**

I can also **create a sample user/role table and JSON example for API requests** to make this README even more clear and interview-ready.

Do you want me to do that?
