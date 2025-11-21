// Kambaz/Courses/dao.js
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  function findAllCourses() {
    return db.courses;
  }
  
  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = db;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }
  
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    // ✅ CREATE NEW ARRAY instead of mutating
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }
  
  function deleteCourse(courseId) {
    const { courses, enrollments } = db;
    // ✅ CREATE NEW ARRAYS instead of mutating
    db.courses = courses.filter((course) => course._id !== courseId);
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
    return true;
  }
  
  function updateCourse(courseId, courseUpdates) {
    const { courses } = db;
    const course = courses.find((course) => course._id === courseId);
    if (!course) {
      return null;
    }
    // ✅ UPDATE THE FOUND COURSE
    Object.assign(course, courseUpdates);
    return course;
  }
  
  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}