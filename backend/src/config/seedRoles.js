const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db");
const RoleTemplate = require("../models/RoleTemplate");

const roles = [
  {
    roleName: "Frontend Developer",
    description: "Builds user interfaces and client-side applications",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive Design", "REST APIs"],
    recommendedSkills: ["TypeScript", "Tailwind CSS", "Redux", "Testing", "Figma", "Next.js"],
    minProjects: 3,
  },
  {
    roleName: "Backend Developer",
    description: "Builds server-side logic, APIs, and database systems",
    requiredSkills: ["JavaScript", "Node.js", "Express", "MongoDB", "REST APIs", "Git", "Authentication"],
    recommendedSkills: ["SQL", "Redis", "Docker", "Testing", "CI/CD", "System Design"],
    minProjects: 3,
  },
  {
    roleName: "Full Stack Developer",
    description: "Builds both frontend and backend of web applications",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "REST APIs", "Git"],
    recommendedSkills: ["TypeScript", "Redux", "Docker", "Testing", "Deployment", "System Design"],
    minProjects: 4,
  },
  {
    roleName: "MERN Developer",
    description: "Specializes in MongoDB, Express, React, Node.js stack",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "REST APIs", "Git"],
    recommendedSkills: ["Redux", "Mongoose", "JWT Authentication", "Tailwind CSS", "Deployment", "Testing"],
    minProjects: 4,
  },
  {
    roleName: "Java Developer",
    description: "Builds enterprise applications using Java ecosystem",
    requiredSkills: ["Java", "Spring Boot", "SQL", "REST APIs", "Git", "OOP", "DSA"],
    recommendedSkills: ["Hibernate", "Microservices", "Docker", "Testing", "Maven", "System Design"],
    minProjects: 3,
  },
];

// Systems Data not user data.
const seedRoles = async () => {
  try {
    await connectDB();
    await RoleTemplate.deleteMany();
    const inserted = await RoleTemplate.insertMany(roles);
    console.log(`${inserted.length} role templates seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedRoles();
