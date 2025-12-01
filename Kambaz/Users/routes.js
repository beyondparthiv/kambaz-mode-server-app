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

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const deleteUser = (req, res) => {
    const { userId } = req.params;
    console.log("🗑️ DELETE USER:", userId);

    const result = dao.deleteUser(userId);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User deleted");
    res.json({ success: true, message: "User deleted successfully" });
  };

  const updateUserById = (req, res) => {
    const { userId } = req.params;
    const updates = req.body;
    console.log("✏️ UPDATE USER BY ID:", userId, updates);

    const updatedUser = dao.updateUser(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User updated");
    res.json(updatedUser);
  };

  const createNewUser = (req, res) => {
    try {
      console.log("📝 CREATE NEW USER:", req.body);
      const newUser = dao.createUser(req.body);
      console.log("✅ User created:", newUser);
      res.json(newUser);
    } catch (error) {
      console.error("❌ Error creating user:", error);
      res.status(500).json({ message: error.message || "Failed to create user" });
    }
  };

  const findUsersForCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("👥 GET USERS FOR COURSE:", courseId);
      const users = dao.findUsersForCourse(courseId);
      console.log(`✅ Found ${users.length} users for course ${courseId}`);
      res.json(users);
    } catch (error) {
      console.error("❌ Error finding users for course:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.put("/api/users/profile", updateProfile);
  app.get("/api/users", findAllUsers);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUserById);
  app.post("/api/users", createNewUser);
}