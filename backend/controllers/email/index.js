const { StatusCodes } = require("http-status-codes");
const { User, Messages, Content } = require("../../models");
const sentmessgaes = async (request, response) => {
  try {
    const { recipient, subject, content } = request.body;
    console.log(content);

    if (!recipient || !content) {
      return response.status(StatusCodes.BAD_GATEWAY).json({
        data: "please fill up each and everything",
      });
    }

    let isuser = await User.find({
      email: recipient,
    });

    if (!isuser) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "user does not exsit",
      });
    }

    let newcontent = new Content({
      content: content,
    });

    await newcontent.save();
    let newMessages = new Messages({
      recipient: isuser._id,
      content: [newcontent.id],
      sender: request.user._id,
      subject: subject,
    });

    await newMessages.save();

    return response.status(StatusCodes.OK).json({
      data: "sucessfully sent it ",
    });
  } catch (error) {
    console.log(error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "internal server errors",
    });
  }
};

module.exports = { sentmessgaes };
