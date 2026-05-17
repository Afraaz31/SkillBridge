const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    techStack: {
      type: [String],
      default: [],
    },
    githubLink: {
      type: String,
      default: "",
    },
    liveLink: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "Planned",
    },
    completionPercent: {
      type: Number,
      min: [0, "Completion cannot be less than 0"],
      max: [100, "Completion cannot exceed 100"],
      default: 0,
    },
    screenshots: {
      type: [String],
      default: [],
    },
    learnings: {
      type: String,
      default: "",
    },
    challenges: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
