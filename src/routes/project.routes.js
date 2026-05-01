const express = require("express");
const router = express.Router();
const { getProjects, addProject, updateProject, deleteProject } = require("../controllers/project.controller");
const { protect } = require("../middleware/auth");

router.get("/projects", protect, getProjects);
router.post("/projects", protect, addProject);
router.put("/projects/:id", protect, updateProject);
router.delete("/projects/:id", protect, deleteProject);

module.exports = router;
