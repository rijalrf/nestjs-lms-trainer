# API Documentation

## Authentication

### User Login

Authenticates a user and returns an access token.

- URL: `/auth/login`
- Method: `POST`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "statusCode": 200,
  "isSucces": true,
  "message": "User logged in successfully",
  "user": {
    "id": "uuid-of-user",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "divisi": "IT",
    "position": "Software Engineer",
    "role": "trainer"
  }
}
```

**Error Responses:**

- **401 Unauthorized:** If the email or password is incorrect.
- **400 Bad Request:** If the request body is invalid or missing required fields.

```json
{
  "statusCode": 401,
  "isSucces": false,
  "message": "Invalid email or password"
}
```

### User Registration

Registers a new user with the specified role.

**URL:** `/auth/register`

**Method:** `POST`

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "anothersecurepassword"
}
```

**Response (201 Created):**

```json
{
  "statusCode": 201,
  "isSucces": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid-of-new-user",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "divisi": "IT",
    "position": "Software Engineer",
    "role": "student"
  }
}
```

**Error Responses:**

- **400 Bad Request:** If the request body is invalid or missing required fields.
- **409 Conflict:** If a user with the provided email or username already exists.

```json
{
  "statusCode": 401,
  "isSucces": false,
  "message": "User with this email or username already exists"
}
```

### Update User

Updates an existing user's information, including their role.

**URL:** `/users/:id`

**Method:** `PATCH`

**Request Body:**

```json
{
  "username": "john.doe.updated",
  "email": "john.doe.updated@example.com",
  "role": "admin"
}
```

**Response (200 OK):**

```json
{
  "id": "uuid-of-updated-user",
  "name": "john doe updated",
  "email": "john.doe.updated@example.com",
  "role": "admin",
  "divisi": "IT",
  "position": "Software Engineer"
}
```
