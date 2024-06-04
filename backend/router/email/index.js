const express = require("express");
const { authentication } = require("../../middlewares");
const { emailcontroller } = require("../../controllers");
const router = express.Router();

router.post("/senttomessage", authentication, emailcontroller.sentmessgaes);

module.exports = router;
