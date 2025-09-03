const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../Middlewares/isAuth");

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ msg: "This email already exist" });
    } else {
      const saltRounds = 10;
      const cryptedPwd = await bcrypt.hash(password, saltRounds);
      const newUser = {
        fullName: fullName,
        email: email,
        password: cryptedPwd,
        role: role && role === "admin" ? "admin" : "user",
      };
      const created = await User.create(newUser);
      const payload = {
        id: created._id,
        role: created.role,
      };
      const token = jwt.sign(payload, process.env.privateKey, {
        expiresIn: "24h",
      });
      const { password: _, ...safeUser } = created.toObject();
      res.send({ msg: "User created!", user: safeUser, token: token });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({ msg: "User not found!" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.send({ msg: "Bad password!" });
      } else {
        const payload = {
          id: user._id,
          role: user.role,
        };
        const token = jwt.sign(payload, process.env.privateKey, {
          expiresIn: "24h",
        });
        const { password: _, ...safeUser } = user.toObject();
        res.send({ msg: "User connected", user: safeUser, token: token });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/isAuth", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
