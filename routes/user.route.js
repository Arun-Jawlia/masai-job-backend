const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("Welcome to Masai Job App User Homepage");
});

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const userPresent = await UserModel.findOne({ email: email });
  if (userPresent?.email) {
    res.send({ msg: "Already exist, Please loggin" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send({ msg: "Signup Successfully", user });
      });
    } catch (err) {
      console.log(err);
      res.send({ msg: "Something went wrong, Please try again later!" });
    }
  }
});

// Login Route
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      const hash_password = user[0].password;
      const userEmail = user[0].email;
      bcrypt.compare(password, hash_password, function (err, result) {
        if (userEmail.includes("@masaischool.com")) {
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, "hush");
            res.send({ msg: "Login successful", token: token, route: "admin" });
          } else {
            res.send({ msg: "Login Failed, Please try again later" });
          }
        }
        else{
            if (result) {
                const token = jwt.sign({ userID: user[0]._id }, "hush");
                res.send({ msg: "Login successful", token: token, route:"user" });
              } else {
                res.send({ msg: "Login Failed, Please try again later" });
              }

        }
      });
    } else {
      res.send({ msg: "Login Failed" });
    }
  } catch (err) {
    console.log("error in your login", err);
    res.send({ msg: "Something went wrong, Please try again later" });
  }
});

module.exports = {
  UserRouter,
};
