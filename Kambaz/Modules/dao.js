import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    // ✅ MUTATE ARRAY to persist changes
    db.modules.push(newModule);
    return newModule;
  }
  function deleteModule(moduleId) {
    const { modules } = db;
    // ✅ MUTATE ARRAY to persist changes
    const moduleIndex = modules.findIndex((module) => module._id === moduleId);
    if (moduleIndex !== -1) {
      modules.splice(moduleIndex, 1);
    }
  }
  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const module = modules.find((module) => module._id === moduleId);
    if (!module) return null;
    Object.assign(module, moduleUpdates);
    return module;
  }
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
