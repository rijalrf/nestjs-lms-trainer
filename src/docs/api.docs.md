# API Documentation

## Authentication

### User Login


- URL: `v1/api/auth/login`
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
  "code": 200,
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "id": "uuid-of-user",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "divisi": "IT",
    "position": "Software Engineer",
    "role": "ADMIN"
  }
}
```

**Error Responses:**


```json
{
  "success": false,
  "code": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "error": "Invalid email address"
    },
    {
      "field": "password",
      "error": "Too small: expected string to have >=8 characters"
    }
  ]
}
```
### User Logout


- URL: `v1/api/auth/logout`
- Method: `POST`


**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Succes Logout"
}
```

### User Registration


**URL:** `/auth/register`

**Method:** `POST`

**Request Body:**

```json
{
    "name": "Gita Amelia",
    "email": "gita.amelia@example.com",
    "password": "GitaAmel!a",
    "divisi": "R&D",
    "position": "Lead",
    "roles": "ADMIN"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Success register",
  "data": {
    "id": 14,
    "name": "Gita Amelia",
    "email": "gita.amelia@example.com",
    "divisi": "R&D",
    "position": "Lead",
    "roles": "ADMIN"
  }
}
```

**Error Responses:**


```json
{
  "success": false,
  "code": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "error": "Invalid email address"
    },
    {
      "field": "password",
      "error": "Too small: expected string to have >=8 characters"
    }
  ]
}
```

### Update User


**URL:** `/users/:id`

**Method:** `PATCH`

**Request Body:**

```json
{
    "name": "Gita Amelia Updated",
    "email": "gita.amelia@example.com",
    "password": "GitaAmel!a",
    "divisi": "R&D",
    "position": "Lead",
    "roles": "ADMIN"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "data": {
    "id": 14,
    "name": "Gita Amelia Updated",
    "email": "gita.amelia@example.com",
    "divisi": "R&D",
    "position": "Lead",
    "roles": "ADMIN"
  }
}
```
