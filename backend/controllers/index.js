const { createtheuuser, logintheuser } = require("./user");
const {
  senttheemail,
  deletetheemail,
  Getthesentboxemail,
  GetTheInboxemail,
  GetTheOnePrticularOne,
} = require("./email");
module.exports = {
  usercontroller: { createtheuuser, logintheuser },
  emailcontroller: {
    senttheemail,
    GetTheInboxemail,
    deletetheemail,
    Getthesentboxemail,
    GetTheOnePrticularOne,
  },
};
