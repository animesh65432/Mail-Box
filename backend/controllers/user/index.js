const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const { createthetoken } = require("../../utils");
const bycrpt = require("bcrypt");
const createtheuuser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "please fill each anv everything",
      });
    }

    const hashpassword = await bycrpt.hash(password, 10);

    let user = await User.create({
      email: email,
      password: hashpassword,
    });

    return response.status(StatusCodes.CREATED).json({
      data: "Sucessfully create the user",
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "internal server errors",
    });
  }
};

const logintheuser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "please fill each anv everything",
      });
    }

    let user = await User.findOne({
      email: email,
    });

    if (!user)
      return response.status(StatusCodes.BAD_GATEWAY).json({
        data: "user does not exsit",
      });

    let Checkthepassword = await bycrpt.compare(password, user.password);

    if (!Checkthepassword) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "password is not same",
      });
    }

    let token = createthetoken({ email: email });

    return response.status(StatusCodes.OK).json({
      data: "sucessfully log in",
      idtoken: token,
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: error,
    });
  }
};

module.exports = { createtheuuser, logintheuser };
