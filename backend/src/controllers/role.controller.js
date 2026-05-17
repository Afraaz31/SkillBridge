const getRoles = (req, res) => {
  const roles = [
    { roleName: "Frontend Developer", requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git", "REST APIs"], minProjects: 3 },
    { roleName: "Backend Developer", requiredSkills: ["Node.js", "Express", "MongoDB", "SQL", "Git", "REST APIs"], minProjects: 3 },
    { roleName: "Full Stack Developer", requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "REST APIs"], minProjects: 4 },
    { roleName: "MERN Developer", requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git", "REST APIs"], minProjects: 4 },
    { roleName: "Java Developer", requiredSkills: ["Java", "Spring Boot", "SQL", "Git", "REST APIs", "DSA"], minProjects: 3 },
  ];

  res.status(200).json({ success: true, data: roles });
};

module.exports = { getRoles };
