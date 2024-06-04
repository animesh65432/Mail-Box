const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const authentication = async (request, response, next) => {
  try {
    let { idtoken } = request.body;
    let { email } = jsonwebtoken.verify(
      idtoken,
      process.env.jsonwebtokenscerect
    );

    let isuser = await User.findOne({
      email: email,
    });

    if (!isuser) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "invaild creadational",
      });
    }

    next();
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "something went wrong",
    });
  }
};

module.exports = { authentication };
