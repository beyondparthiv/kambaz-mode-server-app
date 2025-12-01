import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    dob: { type: Date },
    role: { type: String, enum: ["STUDENT", "FACULTY", "ADMIN"], default: "STUDENT" },
    loginId: { type: String },
    section: { type: String },
    lastActivity: { type: String },
    totalActivity: { type: String },
  },
  { collection: "users" }
);

export default mongoose.model("User", userSchema);
