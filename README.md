# WTWR (What to Wear?) - Backend

## Description

This is the backend API for the WTWR (What To Wear Right Now) application.  
It provides user authentication, clothing item management, and social features such as liking items.  
The backend is built with Node.js, Express, and MongoDB, and is designed to work seamlessly with the WTWR React frontend.

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Validator for data validation
- ESLint (Airbnb configuration)

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jemaxmars/se_project_express.git
   cd se_project_express
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set environment variables:**  
   Create a `.env` file and add your MongoDB URI and JWT secret:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the server:**
   ```sh
   npm run dev
   ```

## Scripts

- `npm run start` — Start production server
- `npm run dev` — Start development server with hot reload
- `npm run lint` — Run ESLint

## API Endpoints

### User Routes

- `POST /signup` — Register a new user
- `POST /signin` — User login
- `GET /users/me` — Get current user profile (requires JWT)
- `PATCH /users/me` — Update user profile (requires JWT)

### Clothing Item Routes

- `GET /items` — Get all clothing items
- `POST /items` — Create new item (requires JWT)
- `DELETE /items/:id` — Delete item (requires JWT, owner only)
- `PUT /items/:id/likes` — Like item (requires JWT)
- `DELETE /items/:id/likes` — Unlike item (requires JWT)

## Project Structure

- `/controllers` — Route handlers
- `/models` — Mongoose schemas
- `/routes` — Express route definitions
- `/middlewares` — Custom middleware (auth, error handling, validation)
- `/utils` — Utility functions

## Notes

- All protected routes require a valid JWT token in the `Authorization` header.
- Passwords are securely hashed using bcryptjs.
- Data validation is handled with Validator and Mongoose.
- The backend is designed to work with the [WTWR Frontend](https://github.com/jemaxmars/se_project_react).

## License

MIT
