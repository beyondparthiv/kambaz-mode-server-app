// Kambaz/Users/dao.js
import { v4 as uuidv4 } from "uuid";

/**
 * Factory so we can pass in the shared db object from index.js
 */
export default function UsersDao(db) {
  // db.users is the array exported from Kambaz/Database/index.js
  const users = db.users;

  const createUser = (user) => {
    const newUser = {
      _id: uuidv4(),
      role: "STUDENT",
      ...user,
    };
    users.push(newUser);
    return newUser;
  };

  const findAllUsers = () => users;

  const findUserById = (userId) =>
    users.find((u) => u._id === userId);

  const findUserByUsername = (username) =>
    users.find((u) => u.username === username);

  const findUserByCredentials = (username, password) =>
    users.find((u) => u.username === username && u.password === password);

  const updateUser = (userId, user) => {
    const index = users.findIndex((u) => u._id === userId);
    if (index === -1) return null;
    users[index] = { ...users[index], ...user };
    return users[index];
  };

  const deleteUser = (userId) => {
    const index = users.findIndex((u) => u._id === userId);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  };

  const findUsersForCourse = (courseId) => {
    const { enrollments } = db;
    return users.filter((user) =>
      enrollments.some((e) => e.user === user._id && e.course === courseId)
    );
  };

  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersForCourse,
  };
}
