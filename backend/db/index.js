const mongoose = require("mongoose");

const connecttionthedatabse = async () => {
  try {
    let res = await mongoose.connect("mongodb://127.0.0.1:27017/Mailbox");
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = { connecttionthedatabse };
