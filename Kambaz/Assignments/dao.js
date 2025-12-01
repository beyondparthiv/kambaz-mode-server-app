import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((a) => a.course === courseId);
  }
  function findAssignmentById(assignmentId) {
    return db.assignments.find((a) => a._id === assignmentId);
  }
  function createAssignment(courseId, assignment) {
    const newAssignment = { _id: uuidv4(), title: assignment.title ?? "Untitled", course: courseId };
    // ✅ MUTATE ARRAY to persist changes
    db.assignments.push(newAssignment);
    return newAssignment;
  }
  function updateAssignment(assignmentId, updates) {
    const a = db.assignments.find((x) => x._id === assignmentId);
    if (!a) return null;
    Object.assign(a, { title: updates.title ?? a.title }); // only fields we persist
    return a;
  }
  function deleteAssignment(assignmentId) {
    const { assignments } = db;
    // ✅ MUTATE ARRAY to persist changes
    const assignmentIndex = assignments.findIndex((a) => a._id === assignmentId);
    if (assignmentIndex !== -1) {
      assignments.splice(assignmentIndex, 1);
    }
    return { status: "ok" };
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
