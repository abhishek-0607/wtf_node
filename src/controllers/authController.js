require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Please provide a different email",
        });
    }
    user = await User.create(req.body);
    console.log(user);
    //we will create token
    const token = newToken(user);

    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Please provide a different email",
        });
    }
    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Please provide a correct Email and Password",
        });
    }
    console.log(user);
    //we will create token
    const token = newToken(user);

    res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

module.exports = { register, login };
