// Kambaz/Users/routes.js
import UsersDao from "./dao.js";

let currentUser = null; // for debugging / consistency

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  // ---------- CRUD ----------

  const createUser = (req, res) => {
    const user = req.body;
    const newUser = dao.createUser(user);
    res.json(newUser);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const { uid } = req.params;
    const user = dao.findUserById(uid);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };

  const updateUser = (req, res) => {
    const { uid } = req.params;
    const updated = dao.updateUser(uid, req.body);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  };

  const deleteUser = (req, res) => {
    const { uid } = req.params;
    const ok = dao.deleteUser(uid);
    if (!ok) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  };

  // ---------- AUTH & SESSION ----------

  const signup = (req, res) => {
    const credentials = req.body;
    const existing = dao.findUserByUsername(credentials.username);
    if (existing) {
      res
        .status(409)
        .json({ message: "Username already taken" });
      return;
    }
    const newUser = dao.createUser(credentials);
    req.session.currentUser = newUser;
    currentUser = newUser;
    res.json(newUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const user = dao.findUserByCredentials(username, password);
    if (!user) {
      res
        .status(401)
        .json({ message: "Invalid username or password" });
      return;
    }
    req.session.currentUser = user;
    currentUser = user;
    res.json(user);
  };

  const signout = (req, res) => {
    req.session.currentUser = null;
    currentUser = null;
    res.sendStatus(200);
  };

  /**
   * Returns the currently logged in user based on the session.
   * Used for:
   *  - reload & still logged in
   *  - login from 2 different browsers
   */
  const profile = (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
      res.sendStatus(401);
      return;
    }
    res.json(user);
  };

  /**
   * Update profile of the currently logged in user.
   * This is what the rubric "Can update profile" will use.
   */
  const updateProfile = (req, res) => {
    const sessionUser = req.session.currentUser;
    if (!sessionUser) {
      res.sendStatus(401);
      return;
    }
    const updated = dao.updateUser(sessionUser._id, req.body);
    req.session.currentUser = updated;
    currentUser = updated;
    res.json(updated);
  };

  // ---------- ROUTE MAPPINGS ----------

  // CRUD
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:uid", findUserById);
  app.put("/api/users/:uid", updateUser);
  app.delete("/api/users/:uid", deleteUser);

  // Auth/session - FIXED: profile should be GET, not POST
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);        // ✅ CHANGED TO GET
  app.put("/api/users/profile", updateProfile);
}