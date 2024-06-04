const express = require("express");
const { usercontroller } = require("../../controllers");
const router = express.Router();

router.post("/singup", usercontroller.createtheuuser);
router.post("/login", usercontroller.logintheuser);

module.exports = router;
