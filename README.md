# CashTrackr SAAS API

> CashTrackr is a personal finance management API built as a **Software as a Service (SaaS)** that allows users to track their budgets and expenses efficiently.

This document describes the **libraries, dependencies, and main configurations** used in the **CashTrackr Backend** project.
The project is built using **Node.js, Express and TypeScript**, following best practices for REST API development.

📄 Full API documentation available at:
[https://documenter.getpostman.com/view/43228681/2sBXinJWxG](https://documenter.getpostman.com/view/43228681/2sBXinJWxG)

---

## General Project Information

| Field | Value |
|-------|-------|
| **Name** | cashtrackr_backend |
| **Version** | 1.0.0 |
| **Author** | Brian Valdivia |
| **License** | ISC |
| **Description** | CashTrackr SaaS API built with Node.js, Express and TypeScript |

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript 5.x
- **Framework:** Express 5.x
- **ORM:** Sequelize TypeScript
- **Databases:** PostgreSQL (primary), MySQL2 (supported)
- **Testing:** Jest + ts-jest
- **Auth:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database instance
- SMTP credentials for email delivery

### Installation

```bash
git clone https://github.com/ing-brian-dev/CASHTRAKR-SAAS-API.git
cd CASHTRAKR-SAAS-API
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection URL |
| `SMTP_HOST` | Email host (e.g. smtp.gmail.com) |
| `SMTP_PORT` | Email port (e.g. 587) |
| `SMTP_USER` | Email account username |
| `SMTP_PASS` | Email account password |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | Frontend origin URL (e.g. http://localhost:3000) |

---

## Project Scripts

The following scripts are defined in `package.json`:

### Development

Runs the project in development mode using **tsx** to execute TypeScript directly.

```bash
npm run dev
# → tsx watch src/
```

### Development (API mode)

Runs the API server in development mode.

```bash
npm run dev:api
# → tsx watch src/ --api
```

### Build

Compiles TypeScript to JavaScript into the `dist` folder.

```bash
npm run build
# → tsc
```

### Start (Production)

Runs the compiled project.

```bash
npm start
# → node ./dist/index.js
```

### Test

Runs the full test suite using Jest.

```bash
npm test
# → jest
```

---

## Production Dependencies

### Express
REST API framework.
```
express ^5.2.1
```

### Sequelize TypeScript
ORM for interacting with SQL databases using TypeScript.
```
sequelize-typescript ^2.1.6
```

### MySQL2
Driver for connecting to **MySQL** databases.
```
mysql2 ^3.19.1
```

### PostgreSQL
Support for **PostgreSQL** databases.
```
pg ^8.20.0
pg-hstore ^2.3.4
```

### JSON Web Token
Used for **token-based authentication**.
```
jsonwebtoken ^9.0.3
```

### Bcrypt
Used for **hashing user passwords**.
```
bcrypt ^6.0.0
```

### Express Validator
Middleware for **validating incoming HTTP request data**.
```
express-validator ^7.3.1
```

### Express Rate Limit
Middleware for **throttling requests and preventing brute-force attacks**.
```
express-rate-limit ^8.3.1
```

### Morgan
HTTP request **logging** middleware.
```
morgan ^1.10.1
```

### Dotenv
Loads environment variables from a `.env` file.
```
dotenv ^17.3.1
```

### Nodemailer
Library for **sending emails** from the application.
```
nodemailer ^8.0.2
```

### Colors
Displays **colored messages in the console** for improved log readability.
```
colors ^1.4.0
```

---

## Development Dependencies

### TypeScript
Primary language used for development.
```
typescript ^5.9.3
```

### TSX
Runs TypeScript files directly without manual compilation.
```
tsx ^4.21.0
```

### TS Node
Executes TypeScript directly in Node.js.
```
ts-node ^10.9.2
```

### Nodemon
Automatically restarts the server when file changes are detected.
```
nodemon ^3.1.14
```

### TypeScript Type Definitions
Type definitions for improved TypeScript support.
```
@types/express ^5.0.6
@types/bcrypt ^6.0.0
@types/jsonwebtoken ^9.0.10
@types/morgan ^1.9.10
@types/nodemailer ^7.0.11
@types/jest ^30.0.0
```

---

## Testing with Jest

Jest is the framework used for **unit testing** in this project.

### Install Jest

```bash
npm install -D jest @types/jest ts-jest
```

### Generate Jest Configuration

```bash
npx ts-jest config:init
```

This will create the `jest.config.js` file automatically.

### HTTP Mocking

`node-mocks-http` is used to mock and simulate API calls in tests.

```bash
npm install -D node-mocks-http
```

---

## Project Structure

```
src/
├── config/         # Database and app configuration
├── handlers/       # Route handler functions
├── middleware/      # Custom Express middleware
├── models/         # Sequelize models
├── routes/         # API route definitions
├── emails/         # Email templates and service
└── index.ts        # Application entry point
```

---

## License

All rights reserved
