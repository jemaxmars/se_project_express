# WTWR (What to Wear?) - Backend

## Description

This is the backend API for the WTWR (What To Wear Right Now) application.  
It provides user authentication, clothing item management, and social features such as liking items.  
The backend is built with Node.js, Express, and MongoDB, and is designed to work seamlessly with the WTWR React frontend.

## Technologies and Techniques Used

- Node.js, Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Validator for data validation
- Celebrate for request validation
- Winston & morgan for logging
- ESLint (Airbnb-base configuration)
- Prettier for code formatting
- PM2 for process management and crash recovery
- CORS configured for secure cross-origin requests

## Project Structure

- `controllers/` — Route handlers
- `middlewares/` — Custom middleware (auth, error handling, validation, logging)
- `errors/` — Custom error constructors
- `routes/` — Express route definitions
- `models/` — Mongoose schemas and models
- `utils/` — Supportive data (error codes)
- `.editorconfig` and `.eslintrc` for code style and linting
- `.gitignore` to exclude unnecessary files from the repo

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

- `npm run start` — Start production server on localhost:3001
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

## Error Handling

- Centralized error handling middleware
- Custom error constructors for each error type
- Returns appropriate status codes and messages for:
  - 400 — Invalid data or ID
  - 401 — Authorization errors
  - 403 — Forbidden actions
  - 404 — Not found
  - 409 — Conflict (duplicate email)
  - 500 — Server errors

## Logging

- All requests and responses are logged to `request.log`
- All errors are logged to `error.log`
- Log files are excluded from the repository

## Database

- Connects to MongoDB at `mongodb://localhost:27017/wtwr_db`
- User schema: `name`, `avatar`, `email`, `password`
- Clothing item schema: `name`, `weather`, `imageUrl`, `owner`, `likes`, `createdAt`
- Validation with the `validator` package

## Crash Test

To test server crash recovery (for code review), visit:

```
GET /crash-test
```

The server will crash and PM2 will automatically restart it.

## Access Information

- **Backend domain:** https://api.wtwr.raresupply.com
- **Frontend GitHub repo:** https://github.com/jemaxmars/se_project_react
- **Frontend deployed:** https://wtwr.raresupply.com
- **Project pitch video:** [(https://www.youtube.com/watch?v=Y1ElcO0zIQ4)]

## Screenshots / Demo

### Main Page

![Main Page](https://ik.imagekit.io/zdkvsvatx/wtwr_mainpage_screenshot.png?updatedAt=1761484035253)

### Profile Page

![Profile Page](https://ik.imagekit.io/zdkvsvatx/wtwr_profile_screenshot.png?updatedAt=1761484035131)

### Change Profile Data Modal

![Change Profile Data Modal](https://ik.imagekit.io/zdkvsvatx/wtwr_change_profile_data_screenshot.png?updatedAt=1761484034829)

### Like/Unlike Clothing Item Functionality

![Like/Unlike Clothing Item Functionality](https://ik.imagekit.io/zdkvsvatx/wtwr_like_unlike_items_screenshot.png?updatedAt=1761483920833)

### Add New Clothing Item

![Add New Clothing Item](https://ik.imagekit.io/zdkvsvatx/wtwr_add_clothes_screenshot.png?updatedAt=1761484034527)

### Clothing Item Preview Modal

![Clothing Item Preview Modal](https://ik.imagekit.io/zdkvsvatx/wtwr_preview_modal_screenshot.png?updatedAt=1761484035086)

### Confirm Delete Modal

![Confirm Delete Modal](https://ik.imagekit.io/zdkvsvatx/wtwr_delete_modal_screenshot.png?updatedAt=1761484034686)

### Sign Up Modal

![Sign Up Modal](https://ik.imagekit.io/zdkvsvatx/wtwr_signup_modal.png?updatedAt=1761484959749)

### Log In Modal

![Log In Modal](https://ik.imagekit.io/zdkvsvatx/wtwr_login_modal.png?updatedAt=1761484959724)

## License

MIT
