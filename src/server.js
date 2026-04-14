const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config(); // reads your .env file 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const skillRoutes = require("./routes/skill.routes");
const projectRoutes = require("./routes/project.routes");
const roleRoutes = require("./routes/role.routes");

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", skillRoutes);
app.use("/api", projectRoutes);
app.use("/api/roles", roleRoutes);

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
