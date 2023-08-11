const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const jwtSecret="abouthotandcoldishmychocolateboy"
router.post(
  "/creatuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let sec_password= await bcrypt.hash(req.body.password,salt)  
    try {
      const new_user = new User({
        name: req.body.name,
        password: sec_password,
        email: req.body.email,
        location: req.body.location,
      });
      await new_user.save();
      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ "email": email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Trying logging with correct credentials" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Trying logging with correct credentials" });
      }
      const data={user:{id:userData.id}}
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
