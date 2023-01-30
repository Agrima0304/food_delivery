const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/creatuser",
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password','incorrect password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const new_user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location
      });
      await new_user.save();
      res.json(
        { success: true }
      )
    }
    catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  })

module.exports = router;