const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisMarcheloPisto$#"
router.post("/creatuser",
  [body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Incorrect Pssword').isLength({ min: 5 })],

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }



    try {

      const name = req.body.name;
      const secpassword = req.body.password;
      const email = req.body.email;
      const location = req.body.location;
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(secpassword, salt)

      await User.create({
        name,
        password,
        email,
        location
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


router.post("/loginuser",
  [body('email').isEmail(),
  body('password', 'Incorrect Pssword').isLength({ min: 5 })],

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }



    try {
      const email = req.body.email;
      const password = req.body.password;

      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try login with correct credentials" })
      }

      const pwdCompare = await bcrypt.compare(password, userData.password)
      if (!pwdCompare) {
        return res.json({ errors: "Try login with correct credentials" })
      }
      const data = {
           user:{
              id:userData.id
           }
      }
      const authToken = jwt.sign(data,jwtSecret)
      res.json({ success: true,authToken:authToken });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


module.exports = router;