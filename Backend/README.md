# Bank Account Management System – Backend

## Project Overview

The Backend of the Bank Account Management System is built using Node.js, Express.js, and MongoDB. It provides secure REST APIs for user authentication, account management, deposits, withdrawals, and transaction tracking.

The backend communicates with MongoDB through Mongoose and handles all business logic required for banking operations.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* CORS
* Nodemon

---

## Project Structure

```text
Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── accountController.js
│   └── transactionController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Account.js
│   └── Transaction.js
│
├── routes/
│   ├── authRoutes.js
│   ├── accountRoutes.js
│   └── transactionRoutes.js
│
├── utils/
│   └── helpers.js
│
├── logs/
│   └── account-errors.log
│
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Features

### Authentication

* User Registration
* User Login
* Password Encryption using bcryptjs
* JWT-based Authentication
* Protected Routes

### Account Management

* Create Bank Account
* View Account Details
* Check Account Balance
* Retrieve Account Information

### Transaction Management

* Deposit Money
* Withdraw Money
* Record Transactions
* Transaction History Tracking

### Logging

* Failed account lookups are automatically stored in:

```text
Backend/logs/account-errors.log
```

This helps with debugging and monitoring account-related issues.

---

## Prerequisites

Before running the project, ensure the following software is installed:

* Node.js 18+ (or compatible version)
* npm
* MongoDB Community Server

OR

* MongoDB Atlas Account

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Backend Directory

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

---

## Required Dependencies

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
```

### Development Dependency

```bash
npm install --save-dev nodemon
```

---

## Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/bankdb

JWT_SECRET=your_jwt_secret
```

Example for MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bankdb
```

---

## Running the Application

### Start Server

```bash
node server.js
```

### Run Using Nodemon

```bash
nodemon server.js
```

OR

Add the following scripts in package.json:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Then run:

```bash
npm run dev
```

---

## Server Configuration

The backend server runs on:

```text
http://localhost:5000
```

MongoDB Connection is configured inside:

```text
config/db.js
```

Application Entry Point:

```text
server.js
```

---

## API Endpoints

### Authentication APIs

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### Account APIs

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/accounts/:id | Get Account Details |
| GET    | /api/accounts     | Get All Accounts    |

### Transaction APIs

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | /api/transactions            | Deposit/Withdraw    |
| GET    | /api/transactions/:accountId | Transaction History |

---

## Workflow

1. User registers an account.
2. Password is encrypted before storage.
3. User logs in using credentials.
4. JWT token is generated.
5. Protected routes validate the token.
6. User performs deposit or withdrawal operations.
7. Transaction data is stored in MongoDB.
8. Account balance is updated automatically.
9. Transaction history can be viewed anytime.

---

## Security Features

* Password Hashing with bcryptjs
* JWT Authentication
* Protected Routes
* Environment Variable Protection
* Input Validation
* Error Handling Middleware

---

## Future Enhancements

* Fund Transfer Between Accounts
* Loan Management Module
* Email Notifications
* OTP Verification
* PDF Account Statements
* Two-Factor Authentication
* Admin Dashboard

---

## Conclusion

The Bank Account Management System Backend provides a secure, scalable, and efficient API layer for banking operations. Using Node.js, Express.js, and MongoDB, it manages authentication, account handling, transaction processing, and data persistence while maintaining security and reliability.
