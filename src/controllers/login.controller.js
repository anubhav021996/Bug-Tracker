const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const newToken = (user) => jwt.sign({ user }, process.env.screat_key);

router.post("", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("No user found");

    const match = user.checkPassword(req.body.password);
    if (!match) return res.status(400).send("Invalid Password");

    let token = newToken(user);

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
