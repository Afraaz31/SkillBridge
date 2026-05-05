const calculateReadiness = (skills, projects, roleTemplate) => {
  // If no role template selected, return zeros
  if (!roleTemplate) {
    return {
      totalScore: 0,
      skillScore: 0,
      projectScore: 0,
      proofScore: 0,
      consistencyScore: 0,
      strengths: [],
      weakAreas: [],
      nextSteps: ["Select a target role to get personalized recommendations"],
    };
  }

  const requiredSkills = roleTemplate.requiredSkills || [];
  const minProjects = roleTemplate.minProjects || 3;

  // 1) Skill score (40%)
  const validStatuses = ["Completed", "Practicing", "Project Applied"];
  const matchedSkills = requiredSkills.filter((reqSkill) =>
    skills.some((s) => s.name.toLowerCase() === reqSkill.toLowerCase() && validStatuses.includes(s.status))
  );
  const skillScore = requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) * 40 : 0;

  // 2) Project score (30%)
  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const projectRatio = Math.min(completedProjects / minProjects, 1);
  const projectScore = projectRatio * 30;

  // 3) Proof score (15%)
  const skillsWithProof = skills.filter((s) => s.evidenceLinks && s.evidenceLinks.length > 0).length;
  const proofScore = skills.length > 0 ? (skillsWithProof / skills.length) * 15 : 0;

  // 4) Consistency score (15%) - items updated in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentSkills = skills.filter((s) => new Date(s.updatedAt) >= thirtyDaysAgo).length;
  const recentProjects = projects.filter((p) => new Date(p.updatedAt) >= thirtyDaysAgo).length;
  const totalItems = skills.length + projects.length;
  const consistencyScore = totalItems > 0 ? ((recentSkills + recentProjects) / totalItems) * 15 : 0;

  // Strengths: completed skill names
  const strengths = skills.filter((s) => s.status === "Completed").map((s) => s.name);

  // Weak areas: required skills the user doesn't have, or has but not actively progressing
  const weakAreas = requiredSkills.filter((reqSkill) => {
    const userSkill = skills.find((s) => s.name.toLowerCase() === reqSkill.toLowerCase());
    return !userSkill || userSkill.status === "Not Started" || userSkill.status === "Learning";
  });

  // Next steps: recommendations based on what's missing
  const nextSteps = [];
  if (weakAreas.length > 0) {
    nextSteps.push(`Start practicing these missing skills: ${weakAreas.slice(0, 3).join(", ")}`);
  }
  if (completedProjects < minProjects) {
    const needed = minProjects - completedProjects;
    nextSteps.push(`Build ${needed} more project${needed > 1 ? "s" : ""} to meet the role's minimum`);
  }
  if (skills.length > 0 && skillsWithProof / skills.length < 0.5) {
    nextSteps.push("Add evidence links (GitHub, certificates) to more of your skills");
  }
  if (consistencyScore < 7.5) {
    nextSteps.push("Update your progress more regularly to improve consistency score");
  }
  if (nextSteps.length === 0) {
    nextSteps.push("Great progress! Keep building and updating your portfolio");
  }

  const totalScore = Math.round(skillScore + projectScore + proofScore + consistencyScore);

  return {
    totalScore,
    skillScore: Math.round(skillScore),
    projectScore: Math.round(projectScore),
    proofScore: Math.round(proofScore),
    consistencyScore: Math.round(consistencyScore),
    strengths,
    weakAreas,
    nextSteps,
  };
};

module.exports = { calculateReadiness };
