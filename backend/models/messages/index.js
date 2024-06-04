const mongoose = require("mongoose");
const MessagesSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: false,
  },
  content: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Content",
    },
  ],
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Messages = mongoose.model("Messages", MessagesSchema);
module.exports = Messages;
