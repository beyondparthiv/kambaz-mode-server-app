import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    // ✅ MUTATE ARRAY to persist changes
    for (let i = enrollments.length - 1; i >= 0; i--) {
      if (enrollments[i].user === userId && enrollments[i].course === courseId) {
        enrollments.splice(i, 1);
      }
    }
  }
  function findMyEnrollments(userId) {
    return db.enrollments.filter((e) => e.user === userId);
  }
  return { enrollUserInCourse, unenrollUserFromCourse, findMyEnrollments, };
}
