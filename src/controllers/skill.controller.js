const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user._id });

    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addSkill = async (req, res) => {
  try {
    const { name, category, level, status, evidenceLinks, notes } = req.body;

    const skill = await Skill.create({
      userId: req.user._id,
      name,
      category,
      level,
      status,
      evidenceLinks,
      notes,
    });

    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    // Check ownership - only the owner can update
    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this skill" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedSkill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    // Check ownership - only the owner can delete
    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this skill" });
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSkills, addSkill, updateSkill, deleteSkill };
