import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String },
    points: { type: Number },
    dueDate: { type: Date },
    availableDate: { type: Date },
  },
  { collection: "assignments" }
);

export default mongoose.model("Assignment", assignmentSchema);
