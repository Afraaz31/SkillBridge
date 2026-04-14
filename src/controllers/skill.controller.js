const getSkills = (req, res) => {
  res.status(200).json({ message: "Get all skills route working" });
};

const addSkill = (req, res) => {
  res.status(200).json({ message: "Add skill route working" });
};

const updateSkill = (req, res) => {
  res.status(200).json({ message: "Update skill route working" });
};

const deleteSkill = (req, res) => {
  res.status(200).json({ message: "Delete skill route working" });
};

module.exports = { getSkills, addSkill, updateSkill, deleteSkill };
