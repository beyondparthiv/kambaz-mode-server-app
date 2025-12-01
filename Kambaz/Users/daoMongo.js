// Kambaz/Users/daoMongo.js - MongoDB implementation
import User from "../Database/models/User.js";
import Enrollment from "../Database/models/Enrollment.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDaoMongo() {
  const createUser = async (user) => {
    const newUser = new User({
      _id: uuidv4(),
      role: "STUDENT",
      ...user,
    });
    await newUser.save();
    return newUser.toObject();
  };

  const findAllUsers = async () => {
    return await User.find({}).lean();
  };

  const findUserById = async (userId) => {
    return await User.findOne({ _id: userId }).lean();
  };

  const findUserByUsername = async (username) => {
    return await User.findOne({ username }).lean();
  };

  const findUserByCredentials = async (username, password) => {
    return await User.findOne({ username, password }).lean();
  };

  const updateUser = async (userId, updates) => {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updates },
      { new: true }
    ).lean();
    return user;
  };

  const deleteUser = async (userId) => {
    const result = await User.deleteOne({ _id: userId });
    return result.deletedCount > 0;
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await Enrollment.find({ course: courseId }).lean();
    const userIds = enrollments.map((e) => e.user);
    return await User.find({ _id: { $in: userIds } }).lean();
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
