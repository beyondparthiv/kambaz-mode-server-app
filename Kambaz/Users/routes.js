// Kambaz/Users/routes.js - ADD THIS ROUTE
import UsersDao from "./dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login" });
    }
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Failed to sign out" });
      } else {
        res.json({ message: "Signed out successfully" });
      }
    });
  };

  // ADD THIS NEW ROUTE - Returns current user from session
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const updateProfile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const userId = currentUser._id;
    const updates = req.body;
    const updatedUser = dao.updateUser(userId, updates);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);  // ← ADD THIS LINE
  app.put("/api/users/profile", updateProfile);
}