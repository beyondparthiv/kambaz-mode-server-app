import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

import * as db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";

const app = express();

// -------------------------
//  CORS FIXED
// -------------------------
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

// -------------------------
//  SESSION FIX (LOCALHOST)
// -------------------------
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

// Only apply secure cookies in PRODUCTION
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));

// -------------------------
app.use(express.json());

// -------------------------
//  ROUTES
// -------------------------
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);

Hello(app);
Lab5(app);

// -------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
