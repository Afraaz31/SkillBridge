const express = require("express");
const router = express.Router();
const { getSkills, addSkill, updateSkill, deleteSkill } = require("../controllers/skill.controller");

router.get("/skills", getSkills);
router.post("/skills", addSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

module.exports = router;
