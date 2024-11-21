# 🎓 School Management Backend Task
This project is a Node.js-based backend application designed for managing school operations. It handles students, teachers, and classes using RESTful APIs, incorporating secure authentication, robust file handling, and database management with MongoDB. The system is scalable and tailored to support educational institutions.

## 💻 Tech Stack
- Runtime: Node.js 🟢
- Framework: Express.js⚡
- Database: MongoDB 🛢️
- Authentication: JWT (JSON Web Tokens) 🔒
- File Handling: Multer & Cloudinary 📤
- Environment Variables: dotenv 📦
- Language: JavaScript 🌐

## 📜 Features
### 🔑 Admin Sign-Up & Login
- Admins must sign up and log in to manage school resources.
 ### 🧑‍🎓 Student Management
- Create, read, update, and delete student records.
- Upload student profile pictures securely using Cloudinary.
### 🧑‍🏫 Teacher Management
- Handle teacher profiles with the same CRUD functionalities as students.
- Role-based authentication ensures secure data management.
### 📚 Class Management
- Create and manage classes, associating them with students and teachers.
### 🔒 Secure Access
- Token-based authentication ensures only authorized users access sensitive APIs.

## 📂 Project Structure
```
src/
├── config/              # Configuration files
├── controllers/         # Business logic for API endpoints
├── middleware/          # Authentication middleware
├── models/              # MongoDB schemas
├── routes/              # API routes
├── util/                # Utility functions (Multer & Cloudinary setup)
├── app.js               # Express app configuration
└── server.js            # Entry point
```

## 🌟 API Endpoints
The following endpoints are used to manage Students, Teachers, and Classes with similar CRUD functionalities.

### Common Features
- Authentication: Secured with isAuth middleware using JWT.
- File Uploads: Uses Multer for handling uploads and Cloudinary for storage.
- CRUD Operations: Full support for create, read, update, and delete operations.

### 🔑 Admin API 🔐
Admins must sign up and log in to perform operations on students, teachers, or classes.

|Method|	Endpoint|	Description|
|------|-------|----------|
|POST	|/api/admin/signup	|Sign up as an admin.|
|POST	|/api/admin/login	|Log in to receive a JWT token.|

- Details
1. Sign-Up (/signup)
Allows a new admin to register.
Example Request:
```
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "securepassword"
}
```
2. Login (/login)
Authenticate the admin and return a JWT token.
Example Request:
```
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

### Student API 🧑‍🎓
|Method|	Endpoint|	Description|
|------|-------|----------|
|GET	|/api/students	|Fetch all student records.|
|GET	|/api/students/:id	|Fetch details of a specific student by ID.|
|POST	|/api/students/create	|Create a new student record with profile upload.|
|PUT	|/api/students/edit/:id	|Update a student's record by ID.|
|DELETE	|/api/students/delete/:id	|Delete a student's record by ID.|

### Teacher API 🧑‍🏫
|Method|	Endpoint|	Description|
|------|-------|----------|
|GET	|/api/teachers	|Fetch all teacher records.|
|GET	|/api/teachers/:id	|Fetch details of a specific teacher by ID.|
|POST	|/api/teachers/create	|Create a new teacher record.|
|PUT	|/api/teachers/edit/:id	|Update a teacher's record by ID.|
|DELETE	|/api/teachers/delete/:id	|Delete a teacher's record by ID.|

Similar to the Student API, these endpoints handle teacher-specific records while ensuring secure operations.

### Class API 📚
|Method|	Endpoint|	Description|
|------|-------|----------|
|GET	|/api/classes	|Fetch all class records.|
|GET	|/api/classes/:id	|Fetch details of a specific class by ID.|
|POST	|/api/classes/create	|Create a new class record.|
|PUT	|/api/classes/edit/:id	|Update a class record by ID.|
|DELETE	|/api/classes/delete/:id	|Delete a class record by ID.|

Class APIs help manage data for various classes and their associations with students and teachers.

## 🚀 Getting Started
### Prerequisites
1. Install Node.js and npm.
2. Have MongoDB running locally or in the cloud.
3. Set up a Cloudinary account for image uploads.

### Installation
1. Clone the repository:
```
git clone https://github.com/Rajat09Sharma/school-management-backend-task.git
cd school-management-backend-task
```
2. Install dependencies:
```
npm install
```
3. Create a .env file and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
```
4. Start the server:
```
npm run dev
```
5. Access the API at:
```
http://localhost:5000
```
## 🔗 References
- Node.js Documentation
- Express.js Documentation
- MongoDB Documentation
- Cloudinary Documentation

For any queries or feedback, please contact via the GitHub Repository. 🚀


