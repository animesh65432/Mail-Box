const { createtheuuser, logintheuser } = require("./user");
const { sentmessgaes } = require("./email");
module.exports = {
  usercontroller: { createtheuuser, logintheuser },
  emailcontroller: { sentmessgaes },
};
