# CRUD API

## Description

This is a simple CRUD (Create, Read, Update, Delete) API built using TypeScript. The application allows users to manage a list of user records.

## Table of Contents

- [CRUD API](#crud-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Testing](#testing)
  - [Linting and Formatting](#linting-and-formatting)
  - [API Endpoints](#api-endpoints)
    - [1. Get All Users](#1-get-all-users)
    - [2. Get User by ID](#2-get-user-by-id)
    - [3. Create a New User](#3-create-a-new-user)
    - [4. Update User by ID](#4-update-user-by-id)
    - [5. Delete User by ID](#5-delete-user-by-id)

## Features

- **Create** a new user record
- **Read** all user records or a specific user by ID
- **Update** an existing user record
- **Delete** a user record by ID

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v22.9.0 or later)
- **npm**
- **TypeScript**

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/roiers/crud-api.git
   cd crud-api
   ```

2. **Install the dependencies:**:

   ```bash
   npm install
   ```

## Running the Application

There are two ways to run the application: in development mode or in production mode.

### Development Mode

To run the application in development mode, which includes hot-reloading with `nodemon`, execute the following command:

```bash
npm run start:dev
```

### Production Mode

To build and run the application in production mode, execute:

```bash
npm run start:dev
```

## Testing

To run the tests for the application, use the following command:

```bash
npm run test
```

## Linting and Formatting

To lint your code, you can run:

```bash
npm run lint
```

To format code with Prettier:

```bash
npm run format
```

## API Endpoints

The API exposes the following endpoints:

### 1. Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Response**: Returns a list of all users.

### 2. Get User by ID

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Response**: Returns the user with the specified ID.

### 3. Create a New User

- **URL**: `/api/users`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the created user.

### 4. Update User by ID

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the updated user.

### 5. Delete User by ID

- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Response**: No content (204) if the deletion was successful.
