export default function WorkingWithObjects(app) {
  // Simple variables for lab exercises
  let assignment = {
    title: "NodeJS Assignment"
  };

  let module = {
    id: 123,
    name: "HTTP Server Module"
  };

  // -------------------------
  // ALREADY EXISTING ROUTES
  // -------------------------

  // Get full assignment object
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // Get assignment title
  app.get("/lab5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  // -------------------------
  // NEW REQUIRED ROUTES
  // -------------------------

  // 1. Update the title
  app.put("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.send(assignment.title);
  });

  // 2. Get module
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  // 3. Get module name
  app.get("/lab5/module/name", (req, res) => {
    res.send(module.name);
  });
}
