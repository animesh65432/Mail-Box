const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.get("/", async (req, res) => {
  res.status(201).json({
    message: "Hello my name is Animesh dutta",
  });
});

app.listen(process.env.port, () => {
  console.log(`server start at  the port ${process.env.port}`);
});
