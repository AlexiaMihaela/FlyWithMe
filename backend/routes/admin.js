const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight'); 


router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
});

module.exports = router;
