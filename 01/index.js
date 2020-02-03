const express = require("express");

const server = express();

server.use(express.json());

const projects = [{ id: 1, title: "Novo projeto", tasks: ["Nova tarefa"] }];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  req.project = project;

  return next();
}

function logRequests(req, res, next) {
  console.count("Contagem de requisições feitas até o momento");

  return next();
}

server.use(logRequests);

// Listagem de todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Listagem de um projeto
server.get("/projects/:id", checkProjectExists, (req, res) => {
  return res.json(req.project);
});

// Criação de um projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// Edição de um projeto
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.send(projects);
});

// Exclusão de um projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

// Criação de uma nova tarefa através de um projeto já existente
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
