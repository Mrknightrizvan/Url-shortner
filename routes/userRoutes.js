const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  const data = await UserModel.find({});
  res.send({ data });
});

userRoutes.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const isNew = await UserModel.findOne({ email: email }).exec();

    if (!isNew) {
      bcrypt.hash(pass, 5, async function (err, hash) {
        const payload = new UserModel({ email, pass: hash });
        await payload.save();
        res.send("user registerd successfully");
      });
    } else {
      return res.send("Alredy a user? Please Login ");
    }
  } catch (error) {
    res.send({ error: error.message });
  }
});
userRoutes.post("/login", async (req, res) => {
  try {
    const { pass, email } = req.body;
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) {
      res.send({ message: "new user ? register here" });
    } else {
      bcrypt.compare(pass, user.pass, function (err, result) {
        if (err) res.send({ message: err.message });
        if (result) {
          return res.send("Login successfull....");
        } else {
          return res.send({
            message: "The password that you've entered is incorrect.",
          });
        }
      });
    }
  } catch (error) {
    if (error) return res.send({ message: error.message });
  }
});

module.exports = userRoutes;
