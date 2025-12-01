import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String },
    points: { type: Number },
    dueDate: { type: Date },
    availableDate: { type: Date },
  },
  { collection: "assignments", _id: false }
);

export default mongoose.model("Assignment", assignmentSchema);
