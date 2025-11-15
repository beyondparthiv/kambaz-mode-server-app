let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let moduleObj = {
  id: 2,
  name: "Module",
  description: "Example of a module",
  course: "CS4550",
};

export default function WorkingWithObjects(app) {

  // FETCH assignment object
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // FETCH assignment title
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // UPDATE assignment title (React client uses this)
  app.get("/lab5/assignment/title/:title", (req, res) => {
    const { title } = req.params;
    assignment.title = title;
    res.json(assignment);   // IMPORTANT!!!
  });

  // UPDATE score
  app.get("/lab5/assignment/score/:score", (req, res) => {
    const { score } = req.params;
    assignment.score = parseInt(score);
    res.json(assignment);
  });

  // UPDATE completed
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  });

  // MODULE ROUTES
  app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json(moduleObj.name);
  });

  app.get("/lab5/module/name/:name", (req, res) => {
    const { name } = req.params;
    moduleObj.name = name;
    res.json(moduleObj);
  });
}
