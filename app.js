const express = require("express");
const connect = require("./src/configs/db");

const { register, login } = require("./src/controllers/authController");

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);

require("dotenv").config();

const port = process.env.PORT || 8888;

app.listen(port, async function () {
  await connect();
  console.log(`Listening to port ${port}`);
});
