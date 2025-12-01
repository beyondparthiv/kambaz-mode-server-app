import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String },
    lessons: [
      {
        _id: { type: String },
        name: String,
        description: String,
        module: String,
      },
    ],
  },
  { collection: "modules", _id: false }
);

export default mongoose.model("Module", moduleSchema);
