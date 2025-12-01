import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String },
    lessons: [
      {
        name: String,
        description: String,
        module: String,
      },
    ],
  },
  { collection: "modules" }
);

export default mongoose.model("Module", moduleSchema);
