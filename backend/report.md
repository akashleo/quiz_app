# Backend System Design Documentation
## Quiz Application Backend Architecture

### Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Core Architecture](#core-architecture)
4. [Technology Stack](#technology-stack)
5. [API Design](#api-design)
6. [Database Design](#database-design)
7. [Authentication & Authorization](#authentication--authorization)
8. [Services & Controllers](#services--controllers)
9. [Error Handling](#error-handling)
10. [Security Implementation](#security-implementation)

## 1. Project Overview
The backend of the Quiz Application is built using Node.js and Express.js, following a modular MVC architecture. It provides RESTful APIs for quiz management, user authentication, and performance tracking.

## 2. Directory Structure
```
backend/
├── app.js                # Application entry point
├── EmojiMap.js          # Emoji mapping utilities
├── package.json         # Dependencies and scripts
├── controllers/         # Request handlers
├── middleware/         # Custom middleware
├── model/             # Database models
├── routes/            # API route definitions
├── services/         # Business logic
└── auth/             # Authentication services
```

## 3. Core Architecture

### MVC Pattern Implementation
- **Models**: Mongoose schemas for data structure
- **Controllers**: Request handling and response formatting
- **Routes**: API endpoint definitions
- **Services**: Business logic implementation

### Middleware Architecture
1. **Authentication Middleware**
   - Token verification
   - User session management
   - Role-based access control

2. **Validation Middleware**
   - Request data validation
   - Input sanitization
   - Error formatting

## 4. Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Google OAuth
- **Validation**: Express Validator
- **File Handling**: Multer
- **Security**: Helmet, CORS, Rate Limiting

## 5. API Design

### RESTful Endpoints

#### User Management
```
POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/verify-otp
```

#### Question Management
```
GET    /api/questions
POST   /api/questions
PUT    /api/questions/:id
DELETE /api/questions/:id
GET    /api/questions/topic/:topicId
```

#### Topic Management
```
GET    /api/topics
POST   /api/topics
PUT    /api/topics/:id
DELETE /api/topics/:id
```

#### Answer Management
```
POST   /api/answers
GET    /api/answers/user/:userId
GET    /api/answers/question/:questionId
```

#### Grade Management
```
POST   /api/grades
GET    /api/grades/user/:userId
GET    /api/grades/topic/:topicId
```

## 6. Database Design

### MongoDB Collections

#### User Collection
```javascript
{
  email: String,
  password: String,
  name: String,
  role: String,
  verified: Boolean,
  googleId: String,
  createdAt: Date
}
```

#### Question Collection
```javascript
{
  text: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  difficulty: String,
  topicId: ObjectId,
  createdBy: ObjectId,
  available: Boolean
}
```

#### Topic Collection
```javascript
{
  name: String,
  description: String,
  questions: [ObjectId],
  createdBy: ObjectId,
  available: Boolean
}
```

#### Answer Collection
```javascript
{
  userId: ObjectId,
  questionId: ObjectId,
  selectedOption: String,
  isCorrect: Boolean,
  attemptedAt: Date
}
```

#### Grade Collection
```javascript
{
  userId: ObjectId,
  topicId: ObjectId,
  score: Number,
  totalQuestions: Number,
  completedAt: Date
}
```

## 7. Authentication & Authorization

### Authentication Methods
1. **Local Authentication**
   - Email/Password with OTP verification
   - JWT token generation and validation
   - Password hashing with bcrypt

2. **Google OAuth**
   - Google Strategy implementation
   - Profile data synchronization
   - Token management

### Authorization Levels
1. **User Roles**
   - Admin
   - Regular User
   - Guest

2. **Access Control**
   - Route protection
   - Resource-level permissions
   - Role-based access

## 8. Services & Controllers

### Controller Implementation
Each controller follows a consistent pattern:
1. Input validation
2. Business logic execution
3. Response formatting
4. Error handling

### Key Controllers

#### QuestionController
- Question CRUD operations
- Bulk question loading
- Question filtering and search
- Topic association management

#### TopicController
- Topic CRUD operations
- Question association
- Availability management
- Topic statistics

#### UserController
- User registration and authentication
- Profile management
- OAuth handling
- Password reset functionality

#### GradesController
- Grade calculation
- Performance tracking
- Progress reporting
- Statistics generation

## 9. Error Handling

### Error Categories
1. **Validation Errors**
   - Input validation failures
   - Data format issues
   - Required field missing

2. **Authentication Errors**
   - Invalid credentials
   - Token expiration
   - Unauthorized access

3. **Database Errors**
   - Connection issues
   - Query failures
   - Duplicate entries

4. **Business Logic Errors**
   - Invalid operations
   - Resource conflicts
   - State violations

### Error Response Format
```javascript
{
  status: number,
  message: string,
  errors: Array<{
    field: string,
    message: string
  }>,
  stack: string // development only
}
```

## 10. Security Implementation

### Security Measures
1. **Input Validation**
   - Request body validation
   - Query parameter sanitization
   - File upload validation

2. **Authentication Security**
   - JWT secret rotation
   - Token expiration
   - Refresh token mechanism

3. **Data Protection**
   - Password hashing
   - Sensitive data encryption
   - Data access control

4. **API Security**
   - Rate limiting
   - CORS configuration
   - HTTP security headers

### Security Middleware
```javascript
app.use(helmet());
app.use(cors());
app.use(rateLimit());
app.use(mongoSanitize());
```

## Performance Optimization

### Database Optimization
1. **Indexing Strategy**
   - Compound indexes
   - Text search indexes
   - Sparse indexes

2. **Query Optimization**
   - Projection selection
   - Population optimization
   - Batch operations

### Caching Implementation
1. **Response Caching**
   - Static content caching
   - API response caching
   - Cache invalidation

2. **Memory Management**
   - Connection pooling
   - Memory monitoring
   - Garbage collection optimization

## Monitoring & Logging

### Logging Implementation
1. **Application Logs**
   - Error logging
   - Access logging
   - Performance metrics

2. **Monitoring Metrics**
   - Response times
   - Error rates
   - Resource utilization

## Deployment & Scaling

### Deployment Configuration
1. **Environment Setup**
   - Environment variables
   - Configuration management
   - Secret management

2. **Scaling Strategy**
   - Horizontal scaling
   - Load balancing
   - Database replication

## Conclusion
The backend architecture is designed with scalability, security, and maintainability in mind. It provides a robust foundation for the Quiz Application with well-structured code organization, comprehensive error handling, and secure authentication mechanisms. The modular design allows for easy extensions and modifications while maintaining code quality and performance standards.
