const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connecttionthedatabse } = require("./db");
const router = require("./router");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", router.userrouter);
app.use("/Email", router.emailrouter);

connecttionthedatabse()
  .then((res) => {
    app.listen(process.env.port, () => {
      console.log(`server start at  the port ${process.env.port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
