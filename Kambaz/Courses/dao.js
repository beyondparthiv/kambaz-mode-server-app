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
    // ✅ MUTATE ARRAY to persist changes
    db.courses.push(newCourse);
    return newCourse;
  }
  
  function deleteCourse(courseId) {
    const { courses, enrollments } = db;

    // ✅ MUTATE ARRAYS to persist changes
    const courseIndex = courses.findIndex((course) => course._id === courseId);
    if (courseIndex !== -1) {
      courses.splice(courseIndex, 1);
    }

    // Remove all enrollments for this course
    for (let i = enrollments.length - 1; i >= 0; i--) {
      if (enrollments[i].course === courseId) {
        enrollments.splice(i, 1);
      }
    }

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