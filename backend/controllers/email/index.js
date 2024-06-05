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
    const currentUser = request.user;

    if (!id) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "Please provide the email ID",
      });
    }
    const email = await Messages.findOne({
      sender: currentUser._id,
      content: [id],
    });

    if (!email) {
      return response.status(StatusCodes.NOT_FOUND).json({
        data: "Email not found",
      });
    }

    await email.deleteOne();

    return response.status(StatusCodes.OK).json({
      data: "Successfully deleted the email",
    });
  } catch (error) {
    console.error("Error deleting email:", error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: "Internal server error",
    });
  }
};

const GetTheOnePrticularOne = async (request, response) => {
  try {
    let { id } = request.params;
    console.log(id);
    let ismsg = await Content.findById(id);
    console.log(ismsg);

    if (!ismsg)
      return response.status(StatusCodes.BAD_REQUEST).json({
        data: "messages don't found",
      });
    let msg = await Messages.findOne({
      sender: request.user._id,
      content: [id],
    })
      .populate("content")
      .populate("sender", "email")
      .populate("recipient", "email");

    return response.status(StatusCodes.OK).json({
      data: msg,
    });
  } catch (error) {
    console.log(error);
    return response.status(StatusCodes.OK).json({
      data: "Something went wrong",
    });
  }
};

module.exports = {
  senttheemail,
  deletetheemail,
  Getthesentboxemail,
  GetTheInboxemail,
  GetTheOnePrticularOne,
};
