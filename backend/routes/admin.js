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

router.get('/:flightNumber', async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber });

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight', error });
  }
});

router.put('/:flightNumber', async (req, res) => {
  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { flightNumber: req.params.flightNumber },
      req.body,
      { new: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ message: 'Error updating flight', error });
  }
});



module.exports = router;
