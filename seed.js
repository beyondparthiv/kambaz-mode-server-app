import mongoose from "mongoose";
import User from "./Kambaz/Database/models/User.js";
import Course from "./Kambaz/Database/models/Course.js";
import Enrollment from "./Kambaz/Database/models/Enrollment.js";
import "dotenv/config";

const users = [
  {
    _id: "123",
    username: "iron_man",
    password: "stark123",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    role: "FACULTY",
    loginId: "001234561S",
    section: "S101",
    lastActivity: "2020-10-01",
    totalActivity: "10:21:32",
  },
  {
    _id: "234",
    username: "dark_knight",
    password: "wayne123",
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce@wayne.com",
    role: "STUDENT",
    loginId: "001234562S",
    section: "S101",
    lastActivity: "2020-09-25",
    totalActivity: "15:30:45",
  },
  {
    _id: "345",
    username: "wonder_woman",
    password: "diana123",
    firstName: "Diana",
    lastName: "Prince",
    email: "diana@amazon.com",
    role: "STUDENT",
    loginId: "001234563S",
    section: "S101",
    lastActivity: "2020-10-05",
    totalActivity: "12:15:20",
  },
];

const courses = [
  {
    _id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    department: "D123",
    credits: 4,
    image: "rocket.jpg",
    description:
      "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology.",
  },
  {
    _id: "RS102",
    name: "Aerodynamics",
    number: "RS4560",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    department: "D123",
    credits: 3,
    image: "aerodynamics.jpg",
    description:
      "This course offers a comprehensive exploration of aerodynamics, focusing on the principles and applications of airflow and its effects on flying objects.",
  },
  {
    _id: "RS103",
    name: "Spacecraft Design",
    number: "RS4570",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    department: "D123",
    credits: 4,
    image: "spacecraft.jpeg",
    description:
      "This course delves into the principles and practices of spacecraft design, offering students a detailed understanding of the engineering and technology behind spacecraft systems.",
  },
  {
    _id: "RS104",
    name: "Organic Chemistry",
    number: "CH1230",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    department: "D134",
    credits: 3,
    image: "organic.jpeg",
    description:
      "Organic Chemistry is an in-depth course that explores the structure, properties, composition, and reactions of organic compounds and materials.",
  },
];

const enrollments = [
  { user: "123", course: "RS101" },
  { user: "234", course: "RS101" },
  { user: "345", course: "RS101" },
  { user: "123", course: "RS102" },
  { user: "234", course: "RS102" },
];

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    console.log("📡 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log("✅ Existing data cleared");

    // Insert new data
    console.log("📝 Inserting users...");
    await User.insertMany(users);
    console.log(`✅ Inserted ${users.length} users`);

    console.log("📝 Inserting courses...");
    await Course.insertMany(courses);
    console.log(`✅ Inserted ${courses.length} courses`);

    console.log("📝 Inserting enrollments...");
    await Enrollment.insertMany(enrollments);
    console.log(`✅ Inserted ${enrollments.length} enrollments`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nSample Login Credentials:");
    console.log("  Username: iron_man");
    console.log("  Password: stark123");
    console.log("  Role: FACULTY\n");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();
