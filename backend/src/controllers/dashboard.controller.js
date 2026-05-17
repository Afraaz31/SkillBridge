const Skill = require("../models/Skill");
const Project = require("../models/Project");
const RoleTemplate = require("../models/RoleTemplate");
const { calculateReadiness } = require("../services/readinessScore");

const getDashboard = async (req, res) => {
  try {
    // Fetch all data in parallel for speed
    const [skills, projects, roleTemplate] = await Promise.all([
      Skill.find({ userId: req.user._id }),
      Project.find({ userId: req.user._id }),
      RoleTemplate.findOne({ roleName: req.user.targetRole }),
    ]);

    // Calculate stats
    const totalSkills = skills.length;
    const completedSkills = skills.filter((s) => s.status === "Completed").length;// pick only those items from an array that match a condition and store it in an arry
    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.status === "Completed").length;
    const skillsWithProof = skills.filter((s) => s.evidenceLinks && s.evidenceLinks.length > 0).length;

    // Calculate readiness score
    const readiness = calculateReadiness(skills, projects, roleTemplate);

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: req.user.name,
          email: req.user.email,
          targetRole: req.user.targetRole,
        },
        stats: {
          totalSkills,
          completedSkills,
          totalProjects,
          completedProjects,
          skillsWithProof,
        },
        readiness,
        roleTemplate,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard };
