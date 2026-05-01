const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      status,
      completionPercent,
      screenshots,
      learnings,
      challenges,
    } = req.body;

    const project = await Project.create({
      userId: req.user._id,
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      status,
      completionPercent,
      screenshots,
      learnings,
      challenges,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects, addProject, updateProject, deleteProject };
