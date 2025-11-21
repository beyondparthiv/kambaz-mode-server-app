// Kambaz/Modules/routes.js
import ModulesDao from "./dao.js";

export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error finding modules:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const createModule = (req, res) => {
    try {
      const { courseId } = req.params;
      const newModule = dao.createModule({ ...req.body, course: courseId });
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteModule = (req, res) => {
    try {
      const { moduleId } = req.params;
      dao.deleteModule(moduleId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const updateModule = (req, res) => {
    try {
      const { moduleId } = req.params;
      const updated = dao.updateModule(moduleId, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Module not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}