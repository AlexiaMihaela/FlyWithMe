const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateRegisterInput, validateLoginInput } = require('../middleware/validateRequest');
const jwt = require('jsonwebtoken');

router.post('/register', validateRegisterInput, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Create new user (isAdmin will default to false)
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
        email: user.email,
        isAdmin: user.isAdmin
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
      { 
        userId: user._id,
        isAdmin: user.isAdmin  // Include isAdmin in JWT payload
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilizatorul nu a fost găsit' });
    }

    res.json(user);
  } catch (err) {
    console.error('Eroare la obținerea datelor utilizatorului:', err);
    res.status(500).json({ message: 'Eroare internă' });
  }
});

router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { field, newValue, currentPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilizatorul nu există." });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Parola actuală este incorectă." });
    }

    if (field === 'password') {
      user.password = newValue;
    } else {
      user[field] = newValue;
    }

    await user.save();

    res.json({ message: `${field} actualizat cu succes.` });
  } catch (err) {
    console.error("Eroare la actualizare:", err);
    res.status(500).json({ message: "Eroare internă la actualizare." });
  }
});

module.exports = router;
