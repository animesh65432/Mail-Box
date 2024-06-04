const mongoose = require("mongoose");

const connecttionthedatabse = async () => {
  try {
    let res = await mongoose.connect(process.env.dburl);
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = { connecttionthedatabse };
