// Kambaz/Courses/routes.js
import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);
  
  const createCourse = (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      console.log("📝 CREATE COURSE - Current user:", currentUser);
      
      if (!currentUser) {
        console.error("❌ No current user in session");
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      console.log("📝 Creating course:", req.body);
      const newCourse = dao.createCourse(req.body);
      console.log("✅ Course created:", newCourse);
      
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      console.log("✅ User enrolled in course");
      
      res.json(newCourse);
    } catch (error) {
      console.error("❌ Error creating course:", error);
      res.status(500).json({ message: error.message || "Failed to create course" });
    }
  };

  const findAllCourses = (req, res) => {
    try {
      const courses = dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("❌ Error finding all courses:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  const findCoursesForEnrolledUser = (req, res) => {
    try {
      let { userId } = req.params;
      
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        console.log("📚 GET ENROLLED COURSES - Current user:", currentUser);
        
        if (!currentUser) {
          console.error("❌ No current user in session");
          return res.status(401).json({ message: "Not authenticated" });
        }
        userId = currentUser._id;
      }
      
      const courses = dao.findCoursesForEnrolledUser(userId);
      console.log(`✅ Found ${courses.length} enrolled courses for user ${userId}`);
      res.json(courses);
    } catch (error) {
      console.error("❌ Error finding enrolled courses:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("🗑️ DELETE COURSE:", courseId);
      
      const result = dao.deleteCourse(courseId);
      console.log("✅ Course deleted");
      
      res.json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting course:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      console.log("✏️ UPDATE COURSE:", courseId, courseUpdates);
      
      const updated = dao.updateCourse(courseId, courseUpdates);
      
      if (!updated) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      console.log("✅ Course updated");
      res.json(updated);
    } catch (error) {
      console.error("❌ Error updating course:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Route mappings
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}