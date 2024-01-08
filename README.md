# Course Selling Website Backend

## Overview

This repository contains the backend for a course-selling website. It incorporates authentication using JWT, input validation using Zod, user signup and login sessions, an Express.js server, and MongoDB as the database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Input Validation**: Utilizes Zod for input validation, ensuring data integrity.
- **Express.js Server**: Backend server built on the Express.js framework.
- **MongoDB Database**: Database integration with MongoDB for storing user data.
- **User Sessions**: Implementation of user signup and login sessions.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imankush10/course-selling-basic-backend.git
    ```

2. Install dependencies:

```bash
cd course-selling-basic-backend
npm install
```

## Configuration

Create a .env file in the root directory:

```env
DB_URL=mongodb URL
USER_JWT_SECRET=Your JWT secret code
ADMIN_JWT_SECRET=Your JWT secret code
```

## Usage

Start the server
```bash
npm start
```
