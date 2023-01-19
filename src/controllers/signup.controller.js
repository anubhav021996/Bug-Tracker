const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const newToken = (user) => jwt.sign({ user }, process.env.screat_key);

router.post("", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) return res.status(400).send("User already exists");

    user = await User.create(req.body);
    const token = newToken(user);

    res.status(200).send("User Registered Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
