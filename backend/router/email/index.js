const express = require("express");
const { authentication } = require("../../middlewares");
const { emailcontroller } = require("../../controllers");
const router = express.Router();

router.post("/sentemail", authentication, emailcontroller.senttheemail);
router.get(
  "/getheinboxemail",
  authentication,
  emailcontroller.GetTheInboxemail
);
router.get(
  "/getthesentemail",
  authentication,
  emailcontroller.Getthesentboxemail
);
router.delete(
  "/deleteEmail/:id",
  authentication,
  emailcontroller.deletetheemail
);
router.get(
  "/GetOne/:id",
  authentication,
  emailcontroller.GetTheOnePrticularOne
);

module.exports = router;
