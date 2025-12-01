import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    course: { type: String, required: true },
  },
  { collection: "enrollments" }
);

// Index for faster queries
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
