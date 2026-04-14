const express = require("express");
const router = express.Router();
const { getRoles } = require("../controllers/role.controller");

router.get("/", getRoles);

module.exports = router;
