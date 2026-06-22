# Bank Account Management System- Frontend

See `Backend/README.md` and `Frontend/frontend/README.md` for per-side install and run instructions.

## Project Overview

The Bank Management System Frontend is a React-based web application that provides a user-friendly interface for customers to perform banking operations online.

Folder structure:
- `Backend/` — Express API, MongoDB models, controllers, routes
- `Frontend/frontend/` — React app (create-react-app structure)

End-to-end workflow:
1. Start MongoDB (local or cloud).
2. Start the backend server.
3. Start the frontend dev server.
4. Use the frontend UI to register, login, deposit, withdraw, and view dashboard.

The frontend communicates with the backend APIs developed using Node.js, Express.js, and MongoDB.

---

## Technologies Used

* React.js
* React Router DOM
* Axios
* HTML5
* CSS3
* JavaScript (ES6)

---

## Features

### User Module

* User Registration
* User Login
* Secure Authentication
* View Account Details
* Deposit Money
* Withdraw Money
* Check Account Balance
* Transaction History

---

## Project Structure

```text
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── Footer.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── UserDashboard.js
│   │   ├── Deposit.js
│   │   ├── Withdraw.js
│   │   └── TransactionHistory.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

---

## Installation

### Step 1: Clone Repository

```bash
git clone <repository-url>
```

### Step 2: Navigate to Frontend Folder

```bash
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

---

## Required Dependencies

Install the following packages:

```bash
npm install react-router-dom axios
```

---

## Running the Application

Start the React Development Server:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

---

## Backend Connection

The frontend communicates with the backend through REST APIs.

Example:

```javascript
axios.get("http://localhost:5000/api/account/profile");
```

---

## Workflow

1. User registers a new account.
2. User logs into the system.
3. JWT token is generated and stored.
4. User accesses dashboard features.
5. User can deposit or withdraw money.
6. All transactions are recorded in MongoDB.
7. User can view transaction history and account balance.

---

## Future Enhancements

* Profile Management
* Password Reset Functionality
* Email Notifications
* Responsive Mobile Design
* Dark Mode Support
* Fund Transfer Feature

---

## Conclusion

The Bank Management System Frontend provides a simple and responsive interface for banking operations. Built with React.js, it enables users to securely manage their accounts, perform transactions, and view account information through seamless integration with the Node.js and MongoDB backend.
