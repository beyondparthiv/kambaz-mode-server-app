# Kambaz Backend API

Node.js/Express backend for the Kambaz learning management system with MongoDB Atlas integration.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string

3. **Seed the database (optional):**
   ```bash
   node seed.js
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   Server runs on http://localhost:4000

## 📁 Project Structure

```
kambaz-node-server-app/
├── Kambaz/
│   ├── Database/
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Enrollment.js
│   │   │   ├── Assignment.js
│   │   │   └── Module.js
│   │   ├── mongodb.js       # MongoDB connection
│   │   └── index.js         # In-memory data (fallback)
│   ├── Users/
│   │   ├── dao.js          # User data access
│   │   └── routes.js       # User API endpoints
│   ├── Courses/
│   ├── Enrollments/
│   ├── Assignments/
│   └── Modules/
├── index.js                 # Main server file
├── seed.js                  # Database seeder
├── render.yaml              # Render deployment config
└── .env                     # Environment variables (DO NOT COMMIT)
```

## 🔗 API Endpoints

### Users
- `POST /api/users/signin` - Sign in
- `POST /api/users/signup` - Sign up
- `POST /api/users/signout` - Sign out
- `GET /api/users/profile` - Get current user
- `GET /api/users` - Get all users
- `GET /api/courses/:courseId/users` - Get users enrolled in course

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/users/:userId/courses` - Get courses for user
- `POST /api/users/current/courses` - Create course
- `PUT /api/courses/:courseId` - Update course
- `DELETE /api/courses/:courseId` - Delete course

### Enrollments
- `POST /api/users/current/enrollments/:courseId` - Enroll in course
- `DELETE /api/users/current/enrollments/:courseId` - Unenroll from course

### Assignments
- `GET /api/courses/:courseId/assignments` - Get assignments for course
- `POST /api/courses/:courseId/assignments` - Create assignment
- `PUT /api/assignments/:assignmentId` - Update assignment
- `DELETE /api/assignments/:assignmentId` - Delete assignment

## 🌐 Deployment

**See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete deployment instructions.**

Quick deployment checklist:
1. ✅ MongoDB Atlas cluster created
2. ✅ Environment variables configured
3. ✅ Code pushed to GitHub
4. ✅ Deployed to Render
5. ✅ Database seeded

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/kambaz` |
| `CLIENT_URL` | Frontend URL (for CORS) | `https://your-app.vercel.app` |
| `SESSION_SECRET` | Secret for session encryption | `random-secret-key` |
| `SERVER_ENV` | Environment mode | `production` or `development` |
| `SERVER_URL` | Server domain | `.onrender.com` |
| `PORT` | Server port | `4000` |

## 📊 Database Models

### User
- username, password, firstName, lastName, email
- role: STUDENT, FACULTY, ADMIN
- loginId, section, lastActivity, totalActivity

### Course
- name, number, description, credits
- startDate, endDate, department
- image, author

### Enrollment
- user (userId), course (courseId)

### Assignment
- title, description, course
- points, dueDate, availableDate

### Module
- name, description, course
- lessons[]

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Check MONGODB_URI is correct
- Verify IP whitelist in MongoDB Atlas (allow `0.0.0.0/0`)

**"CORS error"**
- Update CLIENT_URL to match your frontend URL
- Ensure credentials: true in CORS config

**"Session not persisting"**
- Check SESSION_SECRET is set
- Verify cookie settings for production

## 📝 License

ISC

## 👤 Author

Dia Brar
