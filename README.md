# Book Club API

## Overview
A RESTful API built with Express.js for managing book clubs, enabling users to create reading groups, add books, share reviews, and implement a voting system for book selection. The application includes authentication and email notification features.

## Project Structure
```
src/
├── controller/     # Route handlers and business logic
├── middleware/     # Authentication and validation middleware
├── model/         # Data models and business logic
├── query/         # Database queries
├── routes/        # API route definitions
└── db/            # Database configuration and connection
```

## API Endpoints

### 1. Club Management
```
POST /club/create
```
- Creates a new book club
- No authentication required
- Request body:
  ```json
  {
    "name": "string",
    "read_time": "string",
    "members": ["email1", "email2"],
    "firstBook": "string"
  }
  ```
- Automatically sends welcome emails to all members

### 2. Review Management
```
POST /review/create
```
- Adds a new book review
- Requires authentication
- Request body:
  ```json
  {
    "content": "string"
  }
  ```

### 3. Book Management
```
POST /book/new
```
- Adds a new book to the club
- Requires authentication
- Request body:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```

### 4. Voting System
```
POST /book/vote
```
- Updates vote count for a book
- Requires authentication
- Request body:
  ```json
  {
    "bookId": "string"
  }
  ```

### 5. Current Book Update
```
PATCH /book/actual-update
```
- Updates the club's current book
- No authentication required
- Automatically selects the book with the most votes

## Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT
- **Email Service**: Custom implementation
- **Architecture**: MVC Pattern

## Security Implementation
- JWT-based authentication using `authMiddleware`
- Protected routes require valid Bearer token
- Request validation for required fields
- Error handling for unauthorized access

## Middleware
1. **authMiddleware**: Validates JWT tokens
2. **validatorApi**: Validates required fields in requests

## Error Handling
All endpoints include standardized error responses:
```javascript
{
  "message": "Error message",
  "error": {
    "message": "Detailed error description"
  }
}
```

Status codes:
- 200: Successful operation
- 400: Bad request or validation error
- 401: Unauthorized
- 500: Internal server error

## Setup Requirements
1. Node.js (v14 or higher)
2. NPM or Yarn
3. Database setup (based on your db/ configuration)
4. Environment variables configuration

## Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm start
```

## Environment Variables
```env
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Dependencies
```json
{
  "dependencies": {
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "nodemailer": "^6.6.3"
  }
}
```

## API Response Format
Successful responses:
```javascript
{
  "message": "Operation success message"
}
```

Error responses:
```javascript
{
  "message": "Error message",
  "missingFields": ["field1", "field2"]  // For validation errors
}
```

## Development
1. Follow the Express.js best practices
2. Use async/await for asynchronous operations
3. Implement proper error handling
4. Validate all incoming requests
5. Use middleware for common operations

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
