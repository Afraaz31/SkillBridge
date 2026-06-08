const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

// Load environment variables from .env file
dotenv.config(); // reads your .env file

const { CLIENT_URL } = require("./config/env");

const app = express();

// Middleware
app.use(helmet()); // sets secure HTTP headers
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173"], // production frontend + local dev
    credentials: true,
  })
);
app.use(express.json());

// Root route — used by Render health check
app.get("/", (req, res) => {
  res.status(200).send("SkillBridge API is running");
});

// Routes

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const skillRoutes = require("./routes/skill.routes");
const projectRoutes = require("./routes/project.routes");
const roleRoutes = require("./routes/role.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const gapAnalysisRoutes = require("./routes/gapAnalysis.routes");

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", skillRoutes);
app.use("/api", projectRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/gap-analysis", gapAnalysisRoutes);

// Not found middleware (catches unknown routes)
const notFound = require("./middleware/notFound");
app.use(notFound);

// Error handler middleware (must be last)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const { PORT } = require("./config/env");
const connectDB = require("./config/db");

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
