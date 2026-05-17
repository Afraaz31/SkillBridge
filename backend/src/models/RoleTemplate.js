const mongoose = require("mongoose");

const roleTemplateSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
    },
    requiredSkills: {
      type: [String],
    },
    recommendedSkills: {
      type: [String],
      default: [],
    },
    minProjects: {
      type: Number,
      default: 3,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoleTemplate", roleTemplateSchema);
