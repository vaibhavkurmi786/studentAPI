# Student Management API

A RESTful API for managing student records with guardian information using Node.js, Express, and MySQL with Sequelize ORM.

## Features

- Create student with guardian information
- JWT Authentication
- Input validation
- Transaction support
- CORS enabled
- Error handling
- Database relationships (Student-Guardian)

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm

## Installation

1. Clone the repository:
    git clone <repository-url>
    cd student-api

2. Install dependencies:
    npm install

3. Create a `.env` file in the root directory:
    DB_NAME=school_db
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    JWT_SECRET=your_jwt_secret
    PORT=3000

4. Create MySQL database:
    CREATE DATABASE school_db;

   
## Project Structure
student-api/
├── config/
│ └── database.js
├── controllers/
│ ├── studentController.js
│ └── authController.js
├── middleware/
│ └── auth.js
├── models/
│ ├── index.js
│ ├── Student.js
│ └── Guardian.js
├── routes/
│ ├── studentRoutes.js
│ └── authRoutes.js
├── utils/
│ └── validators.js
├── .env
├── .gitignore
└── index.js


## API Endpoints

### Authentication

Generates a JWT token for testing purposes.

### Student Management

Creates a new student with guardian information.

#### Request Headers

{
"Content-Type": "application/json",
"Authorization": "Bearer <your_jwt_token>"
}


#### Request Body Example

{
"first_name": "John",
"last_name": "Doe",
"email": "john@example.com",
"phone_number": "+919876543210",
"date_of_birth": "2010-05-15",
"gender": "Male",
"guardian": {
"name": "Jane Doe",
"email": "jane@example.com",
"phone_number": "+919876543211",
"relation": "Mother"
},
"address": "123 Street Name, City",
"class": "5A",
"roll_number": 12
}



## Database Schema

### Student Table
- id (Primary Key)
- first_name
- last_name
- email (Unique)
- phone_number (Unique)
- date_of_birth
- gender
- address
- class
- roll_number
- guardian_id (Foreign Key)
- timestamps

### Guardian Table
- id (Primary Key)
- name
- email (Unique)
- phone_number (Unique)
- relation
- timestamps

## Running the Application

Development mode:
nodemon


## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Validation

- Email format validation
- Phone number format validation
- Required fields validation
- Date validation
- Unique constraints (email, phone_number, class+roll_number)

## Security Features

- JWT Authentication
- CORS enabled
- Input validation
- Transaction support
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.
