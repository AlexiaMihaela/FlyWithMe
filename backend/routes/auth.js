const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateRegisterInput, validateLoginInput } = require('../middleware/validateRequest');
const jwt = require('jsonwebtoken');

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

router.post('/login', validateLoginInput, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ errors: { username: 'Invalid credentials' } });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: { password: 'Invalid credentials' } });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
