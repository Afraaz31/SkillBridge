const express = require("express");
const router = express.Router();
const { getProjects, addProject, updateProject } = require("../controllers/project.controller");

router.get("/projects", getProjects);
router.post("/projects", addProject);
router.put("/projects/:id", updateProject);

module.exports = router;
