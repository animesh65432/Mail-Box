const jsonwebtoken = require("jsonwebtoken");

const createthetoken = (obj) => {
  let token = jsonwebtoken.sign(obj, process.env.jsonwebtokenscerect);
  return token;
};
module.exports = { createthetoken };
