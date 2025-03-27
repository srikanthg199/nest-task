<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# **NestJS Backend for User & Document Management**

## **Overview**

This project is a backend service built with **NestJS** to handle **user authentication, document management, and ingestion controls**. It includes APIs for user role management, document CRUD operations, and integration with a Python backend for ingestion processing.

## **Features**

### **Authentication & Authorization**

- User registration, login, and logout.
- Role-based access control (**Admin, Editor, Viewer**).

### **User Management**

- Admin-only APIs to manage user roles and permissions.
- Secure access to user data.

### **Document Management**

- CRUD operations for documents.
- Ability to upload and manage documents.

### **Ingestion Management**

- **Trigger ingestion process** via an API call to a Python backend.
- Track and manage ongoing ingestion tasks.

## **Technology Stack**

- **NestJS** (Backend framework)
- **TypeScript** (For type safety)
- **PostgreSQL** (Recommended database)
- **JWT Authentication** (For secure user access)
- **Microservices Architecture** (Interaction with Python backend)

## **Installation & Setup**

1. **Clone the repository**

   ```sh
   git clone https://github.com/srikanthg199/nest-task
   cd nestjs-backend
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables** (`.env`)

   ```sh
   DB_HOST=db_host
   DB_PORT=db_port
   DB_USER=db_user
   DB_PASSWORD=db_password
   DB_NAME=db_name
   JWT_SECRET=your_secret_key
   PYTHON_BACKEND_URL=http://localhost:5000
   ```

4. **Run the application**
   ```sh
   npm run start:dev
   ```
   - For development: `npm run start:dev`
   - For production: `npm run start:prod`

## **API Endpoints**

| **Endpoint**         | **Method** | **Description**           | **Access**            |
| -------------------- | ---------- | ------------------------- | --------------------- |
| `/auth/register`     | `POST`     | Register a new user       | Public                |
| `/auth/login`        | `POST`     | Login and receive JWT     | Public                |
| `/users`             | `GET`      | Get all users             | Admin, Editor, Viewer |
| `/users/:id`         | `GET`      | Get a single user         | Admin, Editor, Viewer |
| `/users/:id`         | `PATCH`    | Update user role          | Admin                 |
| `/users/:id`         | `DELETE`   | Delete a user             | Admin, Editor         |
| `/documents`         | `POST`     | Upload a document         | Admin, Editor         |
| `/documents/:id`     | `GET`      | Get document details      | All Roles             |
| `/documents/:id`     | `DELETE`   | Delete a document         | Admin, Editor         |
| `/ingestion/trigger` | `POST`     | Trigger ingestion process | Admin, Editor         |
| `/ingestion/:id`     | `GET`      | Get ingestion status      | Admin, Editor, Viewer |

## **Contributing**

- Fork the repository.
- Create a feature branch (`git checkout -b feature-name`).
- Commit your changes (`git commit -m "Added feature"`).
- Push to your branch (`git push origin feature-name`).
- Submit a pull request.

## **License**

This project is licensed under the **MIT License**.
