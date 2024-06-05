const { StatusCodes } = require("http-status-codes");
const { User, Messages, Content } = require("../../models");
const senttheemail = async (request, response) => {
  try {
    const { recipient, subject, content } = request.body;

    if (!recipient || !content) {
      return response.status(StatusCodes.BAD_GATEWAY).json({
        data: "please fill up each and everything",
      });
    }

    let isuser = await User.findOne({
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

const GetTheInboxemail = async (request, response) => {
  try {
    const messages = await Messages.find({
      recipient: request.user._id,
    })
      .populate("sender", "email")
      .populate({
        path: "content",
        select: "content",
      });

    return response.status(StatusCodes.OK).json({
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching inbox emails:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "Internal server error",
    });
  }
};

const Getthesentboxemail = async (request, response) => {
  try {
    const currentUser = request.user;

    if (!currentUser) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        data: "User not authenticated",
      });
    }

    const messages = await Messages.find({
      sender: currentUser._id,
    })
      .populate("recipient", "email")
      .populate("content");

    return response.status(StatusCodes.OK).json({
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching sent emails:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "Internal server error",
    });
  }
};

const deletetheemail = async (request, response) => {
  try {
    const { id } = request.params;
    if (!id)
      return response.status(StatusCodes.BAD_GATEWAY).json({
        data: "please give the id",
      });
    await Content.findById(id);

    return response.status(StatusCodes.OK).json({
      data: "sucessfully delete it",
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "internal server errors",
    });
  }
};

module.exports = {
  senttheemail,
  deletetheemail,
  Getthesentboxemail,
  GetTheInboxemail,
};
