# API Documentation

## 1. Authentication

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
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "divisi": "IT",
    "position": "Software Engineer",
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

### User Logout

- URL: `v1/api/auth/logout`
- Method: `DELETE`

**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Succes Logout"
}
```

### User Registration

**URL:** `v1/api/auth/register`

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

## 2. Users

### Update User

**URL:** `v1/api/users/:id`

**Method:** `PUT`

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

### Get All Users

- URL: `v1/api/users`
- Method: `GET`
- Query Params:
  - `page`: number (optional, default: 1)
  - `limit`: number (optional, default: 10)

**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Success get all users",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "divisi": "IT",
      "position": "Software Engineer",
      "roles": "ADMIN"
    },
    {
      "id": "2",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "divisi": "HR",
      "position": "Recruiter",
      "roles": "USER"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "totalItems": 20,
    "totalPages": 2
  }
}
```

### Get User By ID

- URL: `v1/api/users/:id`
- Method: `GET`

**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Success get user by id",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "divisi": "IT",
    "position": "Software Engineer",
    "roles": "ADMIN"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "User with id 1 not found",
  "errors": "Not Found"
}
```

### Delete User By ID

- URL: `v1/api/users/:id`
- Method: `DELETE`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success delete user by id"
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "User with id 1 not found",
  "errors": "Not Found"
}
```

## 3. Topics

### Create Topic

- URL: `v1/api/topics`
- Method: `POST`

**Request Body:**

```json
{
  "title": "Introduction to NestJS",
  "description": "A comprehensive introduction to the NestJS framework."
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Topic created successfully",
  "data": {
    "id": 1,
    "title": "Introduction to NestJS",
    "description": "A comprehensive introduction to the NestJS framework."
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
      "field": "title",
      "error": "title is required"
    }
  ]
}
```

### Update Topic

- URL: `v1/api/topics/:id`
- Method: `PUT`

**Request Body:**

```json
{
  "title": "Introduction to NestJS updated",
  "description": "A comprehensive introduction to the NestJS framework."
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Topic updated successfully",
  "data": {
    "id": 1,
    "title": "Introduction to NestJS updated",
    "description": "A comprehensive introduction to the NestJS framework."
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
      "field": "title",
      "error": "title is required"
    }
  ]
}
```

### Get All Topics

- URL: `v1/api/topics`
- Method: `GET`
- Query Params:
  - `page`: number (optional, default: 1)
  - `limit`: number (optional, default: 10)

**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Success get topics",
  "data": [
    {
      "id": 1,
      "title": "Introduction to NestJS",
      "description": "A comprehensive introduction to the NestJS framework."
    },
    {
      "id": 2,
      "title": "Introduction to NestJS 2",
      "description": "A comprehensive introduction to the NestJS framework 2."
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "totalItems": 20,
    "totalPages": 2
  }
}
```

### Get Topic By ID

- URL: `v1/api/topics/:id`
- Method: `GET`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success delete topic by id",
  "data": {
    "id": 2,
    "title": "Introduction to NestJS 2",
    "description": "A comprehensive introduction to the NestJS framework 2."
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "topic with id 1 not found",
  "errors": "Not Found"
}
```

### Delete Topic By ID

- URL: `v1/api/topics/:id`
- Method: `DELETE`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success delete topic by id"
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "topic with id 1 not found",
  "errors": "Not Found"
}
```

## 4. Materials

### Create Material

- URL: `v1/api/materials`
- Method: `POST`

**Request Body:**

```json
{
  "title": "NestJS Fundamentals",
  "description": "An in-depth look at the core concepts of NestJS.",
  "topicId": 1,
  "fileUrl": "https://example.com/nestjs-fundamentals.pdf"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Material created successfully",
  "data": {
    "id": 1,
    "title": "NestJS Fundamentals",
    "description": "An in-depth look at the core concepts of NestJS.",
    "topicId": 1,
    "fileUrl": "https://example.com/nestjs-fundamentals.pdf"
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
      "field": "title",
      "error": "Title is required"
    },
    {
      "field": "topicId",
      "error": "Topic ID must be a number"
    }
  ]
}
```

### Update Material

- URL: `v1/api/materials/:id`
- Method: `PUT`

**Request Body:**

```json
{
  "title": "NestJS Fundamentals Updated",
  "description": "An in-depth look at the core concepts of NestJS, updated.",
  "topicId": 1,
  "fileUrl": "https://example.com/nestjs-fundamentals-v2.pdf"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Material updated successfully",
  "data": {
    "id": 1,
    "title": "NestJS Fundamentals Updated",
    "description": "An in-depth look at the core concepts of NestJS, updated.",
    "topicId": 1,
    "fileUrl": "https://example.com/nestjs-fundamentals-v2.pdf"
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
      "field": "title",
      "error": "Title is required"
    }
  ]
}
```

### Get All Materials

- URL: `v1/api/materials`
- Method: `GET`
- Query Params:
  - `page`: number (optional, default: 1)
  - `limit`: number (optional, default: 10)
  - `topicId`: number (optional, filter by topic)

**Response (200 OK):**

```json
{
  "code": 200,
  "success": true,
  "message": "Success get materials",
  "data": [
    {
      "id": 1,
      "title": "NestJS Fundamentals",
      "description": "An in-depth look at the core concepts of NestJS.",
      "topicId": 1,
      "fileUrl": "https://example.com/nestjs-fundamentals.pdf"
    },
    {
      "id": 2,
      "title": "Advanced NestJS Concepts",
      "description": "Exploring advanced features and patterns in NestJS.",
      "topicId": 1,
      "fileUrl": "https://example.com/advanced-nestjs.pdf"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

### Get Material By ID

- URL: `v1/api/materials/:id`
- Method: `GET`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success get material by id",
  "data": {
    "id": 1,
    "title": "NestJS Fundamentals",
    "description": "An in-depth look at the core concepts of NestJS.",
    "topicId": 1,
    "fileUrl": "https://example.com/nestjs-fundamentals.pdf"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "Material with id 1 not found",
  "errors": "Not Found"
}
```

### Get Materials By Topic ID

- URL: `v1/api/materials/topic/:topicId`
- Method: `GET`
- Query Params:
  - `page`: number (optional, default: 1)
  - `limit`: number (optional, default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success get material by topic id",
  "data": [
    {
      "id": 1,
      "title": "NestJS Fundamentals",
      "description": "An in-depth look at the core concepts of NestJS.",
      "topicId": 1,
      "fileUrl": "https://example.com/nestjs-fundamentals.pdf"
    },
    {
      "id": 2,
      "title": "Advanced NestJS Concepts",
      "description": "Exploring advanced features and patterns in NestJS.",
      "topicId": 1,
      "fileUrl": "https://example.com/advanced-nestjs.pdf"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 10,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "topic with id 2 not found",
  "errors": "Not Found"
}
```

## 5. Assignments

### Create Assignment

- URL: `v1/api/assignments`
- Method: `POST`

**Request Body:**

```json
{
  "topicId": 1,
  "materialId": 1,
  "userId": 1,
  "trainingDate": "2025-12-31",
  "startTime": "09:00",
  "endTime": "17:00",
  "maxParticipant": 50,
  "classRoomLink": "https://meet.google.com/xxx-xxx-xxx",
  "status": "DRAFT"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "code": 201,
  "message": "Assignment created successfully",
  "data": {
    "id": 32,
    "trainingDate": "2025-10-10",
    "startTime": "10.00",
    "endTime": "11.00",
    "maxParticipant": 50,
    "classRoomLink": "https://meet.google.com/xxx-xxx-xxx",
    "status": "DRAFT",
    "trainer": {
      "id": 7,
      "name": "Rijal Rifai",
      "email": "rijal@ppu.co.id"
    },
    "topic": {
      "id": 17,
      "title": "Voluptatem Consequa update",
      "description": "Nemo duis aliqua Fu updated"
    },
    "material": {
      "id": 10,
      "title": "Dolor beatae cumque ",
      "description": "Eos reprehenderit re",
      "topicId": 17,
      "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
    }
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
      "field": "topicId",
      "error": "topicId is required"
    }
  ]
}
```

### Update Assignment

- URL: `v1/api/assignments/:id`
- Method: `PUT`

**Request Body:**

```json
{
  "topicId": 1,
  "materialId": 1,
  "userId": 1,
  "trainingDate": "2025-12-31",
  "startTime": "09:00:00",
  "endTime": "17:00:00",
  "maxParticipant": 50,
  "classRoomLink": "https://meet.google.com/xxx-xxx-xxx",
  "status": "PUBLISH"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Assignment updated successfully",
  "data": {
    "id": 2,
    "trainingDate": "2025-10-10",
    "startTime": "10.00",
    "endTime": "12.00",
    "maxParticipant": 50,
    "classRoomLink": "https://meet.google.com/xxx-xxx-xxx updated",
    "status": "DRAFT",
    "trainer": {
      "id": 7,
      "name": "Rijal Rifai",
      "email": "rijal@ppu.co.id"
    },
    "topic": {
      "id": 17,
      "title": "Voluptatem Consequa update",
      "description": "Nemo duis aliqua Fu updated"
    },
    "material": {
      "id": 10,
      "title": "Dolor beatae cumque ",
      "description": "Eos reprehenderit re",
      "topicId": 17,
      "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
    }
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
      "field": "topicId",
      "error": "topicId is required"
    }
  ]
}
```

### Get All Assignments

- URL: `v1/api/assignments`
- Method: `GET`
- Query Params:
  - `page`: number (optional, default: 1)
  - `limit`: number (optional, default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success get all assignments",
  "data": [
    {
      "id": 2,
      "trainingDate": "2025-10-10",
      "startTime": "10.00",
      "endTime": "12.00",
      "maxParticipant": 50,
      "classRoomLink": "https://meet.google.com/xxx-xxx-xxx updated",
      "status": "DRAFT",
      "trainer": {
        "id": 7,
        "name": "Rijal Rifai",
        "email": "rijal@ppu.co.id"
      },
      "topic": {
        "id": 17,
        "title": "Voluptatem Consequa update",
        "description": "Nemo duis aliqua Fu updated"
      },
      "material": {
        "id": 10,
        "title": "Dolor beatae cumque ",
        "description": "Eos reprehenderit re",
        "topicId": 17,
        "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
      }
    },
    {
      "id": 3,
      "trainingDate": "2025-12-20",
      "startTime": "16.00",
      "endTime": "17.00",
      "maxParticipant": 50,
      "classRoomLink": "https://meet.google.com/xxx-xxx-xxx",
      "status": "DRAFT",
      "trainer": {
        "id": 7,
        "name": "Rijal Rifai",
        "email": "rijal@ppu.co.id"
      },
      "topic": {
        "id": 17,
        "title": "Voluptatem Consequa update",
        "description": "Nemo duis aliqua Fu updated"
      },
      "material": {
        "id": 8,
        "title": "Repellendus Vitae c",
        "description": "Commodi deleniti acc",
        "topicId": 17,
        "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
      }
    },
    {
      "id": 4,
      "trainingDate": "2025-12-20",
      "startTime": "16.00",
      "endTime": "17.00",
      "maxParticipant": 50,
      "classRoomLink": "https://meet.google.com/xxx-xxx-xxx",
      "status": "DRAFT",
      "trainer": {
        "id": 7,
        "name": "Rijal Rifai",
        "email": "rijal@ppu.co.id"
      },
      "topic": {
        "id": 17,
        "title": "Voluptatem Consequa update",
        "description": "Nemo duis aliqua Fu updated"
      },
      "material": {
        "id": 7,
        "title": "Ex architecto conseq",
        "description": "Eum numquam quibusda",
        "topicId": 17,
        "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "perPage": 3,
    "totalItems": 31,
    "totalPages": 11
  }
}
```

### Get Assignment By ID

- URL: `v1/api/assignments/:id`
- Method: `GET`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success get assignment by id",
  "data": {
    "id": 2,
    "trainingDate": "2025-10-10",
    "startTime": "10.00",
    "endTime": "12.00",
    "maxParticipant": 50,
    "classRoomLink": "https://meet.google.com/xxx-xxx-xxx updated",
    "status": "DRAFT",
    "trainer": {
      "id": 7,
      "name": "Rijal Rifai",
      "email": "rijal@ppu.co.id"
    },
    "topic": {
      "id": 17,
      "title": "Voluptatem Consequa update",
      "description": "Nemo duis aliqua Fu updated"
    },
    "material": {
      "id": 10,
      "title": "Dolor beatae cumque ",
      "description": "Eos reprehenderit re",
      "topicId": 17,
      "fileUrl": "https://coinmarketcap.com/currencies/bitcoin/"
    }
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "Assignment with id 1 not found",
  "errors": "Not Found"
}
```

### Delete Assignment By ID

- URL: `v1/api/assignments/:id`
- Method: `DELETE`

**Response (200 OK):**

```json
{
  "success": true,
  "code": 200,
  "message": "Success delete assignment"
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "code": 404,
  "message": "Assignment with id 1 not found",
  "errors": "Not Found"
}
```
