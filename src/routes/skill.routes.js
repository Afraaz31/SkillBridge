const express = require("express");
const router = express.Router();
const { getSkills, addSkill, updateSkill, deleteSkill } = require("../controllers/skill.controller");
const { protect } = require("../middleware/auth");

router.get("/skills", protect, getSkills);
router.post("/skills", protect, addSkill);
router.put("/skills/:id", protect, updateSkill);
router.delete("/skills/:id", protect, deleteSkill);

module.exports = router;
