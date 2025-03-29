const User = require('../models/User');

const validateRegisterInput = async (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = {};

  if (!username || username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  } else {
    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      errors.username = 'Username is already taken';
    }
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address';
  } else {
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      errors.email = 'Email is already registered';
    }
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateLoginInput = async (req, res, next) => {
  const { username, password } = req.body;
  const errors = {};

  if (!username || username.trim().length === 0) {
    errors.username = 'Username is required';
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateRegisterInput, validateLoginInput }; 