const Skill = require("../models/Skill");
const Project = require("../models/Project");
const RoleTemplate = require("../models/RoleTemplate");

const getGapAnalysis = async (req, res) => {
  try {
    if (!req.user.targetRole) {
      return res.status(400).json({
        success: false,
        message: "Please set a target role first to get gap analysis",
      });
    }

    // Fetch user's skills, projects, and role template in parallel
    const [skills, projects, roleTemplate] = await Promise.all([
      Skill.find({ userId: req.user._id }),
      Project.find({ userId: req.user._id }),
      RoleTemplate.findOne({ roleName: req.user.targetRole }),
    ]);

    if (!roleTemplate) {
      return res.status(404).json({
        success: false,
        message: "Role template not found for your target role",
      });
    }

    const requiredSkills = roleTemplate.requiredSkills || [];
    const minProjects = roleTemplate.minProjects || 3;

    const matchedSkills = [];
    const missingSkills = [];
    const weakSkills = [];

    requiredSkills.forEach((reqSkill) => {
      const userSkill = skills.find(
        (s) => s.name.toLowerCase() === reqSkill.toLowerCase()
      );

      if (!userSkill) {
        missingSkills.push(reqSkill);
      } else if (userSkill.status === "Not Started" || userSkill.status === "Learning") {
        weakSkills.push({
          name: userSkill.name,
          status: userSkill.status,
          level: userSkill.level,
        });
      } else {
        matchedSkills.push({
          name: userSkill.name,
          status: userSkill.status,
          level: userSkill.level,
        });
      }
    });

    const overallMatch = requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

    // Build recommendations
    const recommendations = [];

    if (missingSkills.length > 0) {
      missingSkills.slice(0, 3).forEach((skill) => {
        recommendations.push(`Start learning ${skill}`);
      });
    }

    if (weakSkills.length > 0) {
      weakSkills.slice(0, 2).forEach((skill) => {
        recommendations.push(`Move ${skill.name} from "${skill.status}" to "Practicing" by applying it in a project`);
      });
    }

    const completedProjects = projects.filter((p) => p.status === "Completed").length;
    if (completedProjects < minProjects) {
      const needed = minProjects - completedProjects;
      recommendations.push(`Build ${needed} more project${needed > 1 ? "s" : ""} to meet the role's minimum of ${minProjects}`);
    }

    const skillsWithoutProof = skills.filter((s) => !s.evidenceLinks || s.evidenceLinks.length === 0);
    if (skillsWithoutProof.length > 0) {
      recommendations.push(`Add evidence links (GitHub, certificates) to ${skillsWithoutProof.length} skill${skillsWithoutProof.length > 1 ? "s" : ""} without proof`);
    }

    if (recommendations.length === 0) {
      recommendations.push("You're on track! Keep building and adding proof to strengthen your portfolio");
    }

    res.status(200).json({
      success: true,
      data: {
        targetRole: req.user.targetRole,
        overallMatch,
        matchedSkills,
        missingSkills,
        weakSkills,
        recommendations,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGapAnalysis };
