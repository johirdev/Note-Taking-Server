# Secure Note-Taking Application

Technical Interview Task: Secure Note-Taking Application

## 1. Project Overview
This project is a backend-focused REST API for a secure note-taking platform. The main goal is to implement authentication, role-based access control, pagination, MongoDB indexing, and aggregation pipelines in a clean modular structure.

The application is built around three core modules:
- User
- Post
- Note

## 2. Core Requirements
### Role-Based Access Control
- User:
  - Can create, update, delete, and view a list of their own notes.
- Admin:
  - Inherits all user permissions.
  - Can manage users (create, update, delete, and list all users).
  - Can view all notes.

### Technical Stack
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for request validation

## 3. Functional Goals
- Implement secure user registration and login.
- Protect routes using JWT authentication.
- Enforce role-based permissions on the server side.
- Support pagination for all list APIs.
- Use Mongoose schema indexes with schema.index(...) for all required query support.
- Implement the required MongoDB aggregation scenarios.

## 4. Database Indexing and API Optimization
The database design must follow the task constraints carefully.

### Important Rules
- Do not create unnecessary indexes.
- Only add indexes that are strictly needed to support the listed queries and aggregations.
- Use schema.index(...) directly in the Mongoose model files so reviewers can see the indexing strategy clearly.

### Required Indexing Strategy
- Index notes by owner and creation time to support user note listing and sorting.
- Index user-related list and read queries only where required.
- Index post lookup fields when required for aggregation support.

Example pattern:
```ts
UserSchema.index({ email: 1 });
NoteSchema.index({ owner: 1, createdAt: -1 });
PostSchema.index({ authorId: 1 });
```

## 5. Aggregation Tasks
These tasks must be implemented using MongoDB aggregation pipelines.

### Scenario 1: Group Users by Interests
- Context: users have an interests array.
- Task: return users grouped by interest.
- Constraint: use exactly one collection.aggregate() call.

### Scenario 2: Retrieve Posts for a Specific User
- Context: posts are stored in a separate Posts collection.
- Task: get all posts belonging to a specific user using one aggregation pipeline with a $lookup stage.

## 6. API Design Overview
### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Users
- GET /api/users (Admin only)
- GET /api/users/:id (Admin only)
- POST /api/users (Admin only)
- PUT /api/users/:id (Admin only)
- DELETE /api/users/:id (Admin only)

### Notes
- GET /api/notes
- GET /api/notes/:id
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id

### Posts
- GET /api/post
- GET /api/post/user/:userId

## 7. Project Structure
```text
src/
  app.ts
  server.ts
  apps/
    constant/
    middlewares/
    modules/
      user/
      post/
      note/
    routes/
  config/
  errors/
  helpers/
  interfaces/
  shared/
```

## 8. Environment Variables
Create a .env file with the following values:
```env
PORT=8081
MONGODB_URI=mongodb://127.0.0.1:27017/note-taking-server
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

## 9. Installation and Run
### Install dependencies
```bash
npm install
```

### Run in development mode
```bash
npm run dev
```

### Build the project
```bash
npm run build
```

### Start the built app
```bash
npm start
```

## 10. Evaluation Checklist
The implementation should be reviewed against the following points:
- Secure password hashing
- JWT-based authentication
- Role-based access control
- Pagination for list APIs
- Proper minimal indexing with schema.index(...)
- Correct aggregation pipeline implementation
- Clean modular backend architecture

## 11. Notes
This task is primarily a backend implementation. The focus is on correctness, security, scalability, and proper database query design rather than frontend styling.
