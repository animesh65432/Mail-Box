const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Messages = mongoose.model("Messages", MessagesSchema);
module.exports = Messages;
