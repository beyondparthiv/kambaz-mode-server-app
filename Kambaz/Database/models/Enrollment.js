import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    user: { type: String, required: true },
    course: { type: String, required: true },
  },
  { collection: "enrollments", _id: false }
);

// Index for faster queries
enrollmentSchema.index({ user: 1, course: 1 });

export default mongoose.model("Enrollment", enrollmentSchema);
