import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/kambaz";

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // Don't exit process in development
    if (process.env.SERVER_ENV !== "development") {
      process.exit(1);
    }
  }
};

export default connectDB;
