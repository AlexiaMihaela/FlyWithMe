const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateRegisterInput } = require('../middleware/validateRequest');

router.post('/register', validateRegisterInput, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Create new user
    const user = new User({
      username: username.trim(),
      email: email.toLowerCase(),
      password
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
