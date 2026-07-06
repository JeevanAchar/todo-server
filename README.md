# Todo Backend API

A secure, backend API for Todo applications built with Express.js, TypeScript, MongoDB, and JWT authentication.

## 🌟 Features

- ✅ **JWT Authentication** - Secure token-based user authentication
- ✅ **Authorization** - Users can only access their own todos
- ✅ **Password Security** - Bcrypt password hashing
- ✅ **Input Validation** - Comprehensive email, password, and todo validation
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **CORS Support** - Configured for cross-origin requests
- ✅ **MongoDB Integration** - Scalable database with Mongoose
- ✅ **Error Handling** - Proper HTTP status codes and error messages
- ✅ **Field Projection** - Returns only necessary data fields
- ✅ **Database Indexes** - Optimized queries for performance

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Todo_Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.development` file in the root directory:

```bash
# Server Configuration
PORT=3001
HOST="127.0.0.1"

# Application Environment
NODE_ENV="development"

# MongoDB Configuration
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/database"

# JWT Configuration
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRY="7d"

# CORS Configuration
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:8081"
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3001`

### 5. Build for Production

```bash
npm run build
```

### 6. Run Production Build

```bash
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/v1/api
```

### Authentication Endpoints

#### Sign Up
Create a new user account.

**Endpoint:** `POST /signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "user_id": "uuid-string",
    "email": "user@example.com",
    "token": "jwt-token-string"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

**Validation Rules:**
- Email must be valid email format
- Password must be at least 8 characters

---

#### Log In
Authenticate user and get JWT token.

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": "uuid-string",
    "email": "user@example.com",
    "token": "jwt-token-string"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Todo Endpoints

**⚠️ All todo endpoints require JWT authentication**

Include the token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

---

#### Create Todo
Add a new todo item.

**Endpoint:** `POST /todo`

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "todo": "Buy groceries"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "todo_id": "uuid-string",
    "todo": "Buy groceries",
    "createdAt": "2026-07-06T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Todo must be between 1 and 500 characters"
}
```

---

#### Get All Todos
Fetch all todos for the authenticated user.

**Endpoint:** `GET /todo`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todos fetched successfully",
  "data": [
    {
      "todo_id": "uuid-string",
      "todo": "Buy groceries",
      "createdAt": "2026-07-06T10:30:00.000Z"
    },
    {
      "todo_id": "uuid-string",
      "todo": "Call mom",
      "createdAt": "2026-07-06T09:15:00.000Z"
    }
  ]
}
```

---

#### Update Todo
Modify an existing todo item.

**Endpoint:** `PUT /todo/:todo_id`

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**URL Parameters:**
- `todo_id` - The ID of the todo to update

**Request Body:**
```json
{
  "todo": "Updated todo text"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "todo_id": "uuid-string",
    "todo": "Updated todo text",
    "createdAt": "2026-07-06T10:30:00.000Z"
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Unauthorized: You cannot modify this todo"
}
```

---

#### Delete Todo
Remove a todo item.

**Endpoint:** `DELETE /todo/:todo_id`

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**URL Parameters:**
- `todo_id` - The ID of the todo to delete

**Success Response (204):**
```
No Content
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Unauthorized: You cannot delete this todo"
}
```

---

## 🔐 Authentication Flow

1. **User Registration:**
   - Send email and password to `/signup`
   - Receive `token`, `user_id`, and `email`
   - Store token in client (localStorage, sessionStorage, or secure cookie)

2. **User Login:**
   - Send email and password to `/login`
   - Receive `token` and `user_id`
   - Store token for authenticated requests

3. **Authenticated Requests:**
   - Include token in `Authorization: Bearer <token>` header
   - Server validates token and extracts `user_id`
   - User can only access their own todos

4. **Token Expiration:**
   - Default expiry: 7 days
   - Expired tokens return 401 Unauthorized
   - User must login again to get new token

---

## 📂 Project Structure

```
Todo_Backend/
├── src/
│   ├── app.ts                    # Express app configuration
│   ├── start.ts                  # Server entry point
│   ├── config.ts                 # Environment configuration
│   ├── mongo.ts                  # MongoDB connection
│   ├── controllers/
│   │   ├── Auth.ts              # Authentication endpoints
│   │   └── Todo.ts              # Todo endpoints
│   ├── service/
│   │   ├── Auth.ts              # Auth business logic
│   │   └── Todo.ts              # Todo business logic
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   └── Todo.ts              # Todo schema
│   ├── routes/
│   │   └── AppRoute.ts          # API routes
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT verification
│   │   └── validation.ts        # Input validation
│   └── utils/
│       ├── CommonUtils.ts       # Utility functions
│       └── ResponseFormatter.ts # Response formatting
├── dist/                         # Compiled JavaScript
├── package.json
├── tsconfig.json
├── nodemon.json
├── .env.example
├── .env.development
└── README.md
```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `HOST` | Server host address | `127.0.0.1` |
| `NODE_ENV` | Environment mode | `development`, `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `JWT_EXPIRY` | JWT token expiration time | `7d`, `24h` |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `http://localhost:3000,http://localhost:8081` |

---

## 🧪 Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:3001/v1/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/v1/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Todo (replace TOKEN with actual token)
```bash
curl -X POST http://localhost:3001/v1/api/todo \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "todo": "Buy groceries"
  }'
```

### Get Todos
```bash
curl -X GET http://localhost:3001/v1/api/todo \
  -H "Authorization: Bearer TOKEN"
```

---

## 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK - Request successful |
| `201` | Created - Resource created |
| `204` | No Content - Successful DELETE |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid credentials or token |
| `403` | Forbidden - Access denied (not owner) |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Duplicate user email |
| `500` | Internal Server Error |

---

## 🔒 Security Features

- **Password Hashing:** Passwords are hashed with bcrypt (10 salt rounds)
- **JWT Tokens:** Secure token-based authentication
- **Rate Limiting:** Max 5 login/signup attempts per 15 minutes
- **CORS:** Configurable cross-origin access
- **Input Validation:** All inputs validated before processing
- **Data Projection:** Only necessary fields returned in responses
- **Authorization:** Users can only modify their own todos
- **Database Indexes:** Optimized queries on frequently searched fields
- **Environment Secrets:** Sensitive data in environment variables

---

## 🚀 Production Deployment

### Before Deploying:

1. **Change JWT Secret:**
   ```env
   JWT_SECRET="generate-a-random-secret-here"
   ```

2. **Set NODE_ENV:**
   ```env
   NODE_ENV="production"
   ```

3. **Use MongoDB Atlas or managed MongoDB:**
   - Use cloud MongoDB instance instead of local
   - Set proper `MONGO_URI`

4. **Configure CORS:**
   - Update `ALLOWED_ORIGINS` with your frontend URL
   ```env
   ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Start production server:**
   ```bash
   npm start
   ```

---

## 📝 Available Scripts

```bash
# Development - runs with nodemon auto-reload
npm run dev

# Build - compile TypeScript to JavaScript
npm run build

# Production - run compiled JavaScript
npm start

# Production (staging) - run with staging environment
npm run start:staging

# Test - run tests (not yet configured)
npm test
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify `MONGO_URI` is correct
- Check MongoDB server is running
- Ensure IP is whitelisted in MongoDB Atlas

### JWT Token Invalid
- Token may be expired (default 7 days)
- Login again to get a new token
- Check `JWT_SECRET` matches between signup and request

### CORS Error
- Add your frontend URL to `ALLOWED_ORIGINS`
- Restart the server after changing env variables

### Rate Limit Exceeded
- Wait 15 minutes or use a different IP address
- Applicable only to signup/login endpoints

---

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variable management
- **express-rate-limit** - Rate limiting
- **uuid** - Unique ID generation
- **typescript** - Type safety
- **nodemon** - Development auto-reload

---

## 🔄 Version History

- **v1.0.0** - Initial release with JWT auth, CRUD operations, and security features

---

## 📄 License

This project is licensed under the ISC License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues or questions, please open an issue in the repository.

---

## ✨ Future Enhancements

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Refresh token mechanism
- [ ] Todo categories/tags
- [ ] Todo priority levels
- [ ] Todo due dates
- [ ] Todo sharing between users
- [ ] Comprehensive test suite
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Docker containerization

---

**Last Updated:** 2026-07-06

**Status:** ✅ Development Mode Ready
