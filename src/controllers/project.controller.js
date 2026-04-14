const getProjects = (req, res) => {
  res.status(200).json({ message: "Get all projects route working" });
};

const addProject = (req, res) => {
  res.status(200).json({ message: "Add project route working" });
};

const updateProject = (req, res) => {
  res.status(200).json({ message: "Update project route working" });
};

module.exports = { getProjects, addProject, updateProject };
