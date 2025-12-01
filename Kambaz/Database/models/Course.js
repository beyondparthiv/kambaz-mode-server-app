import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    department: { type: String },
    credits: { type: Number },
    image: { type: String },
    description: { type: String },
    author: { type: String },
  },
  { collection: "courses", _id: false }
);

export default mongoose.model("Course", courseSchema);
