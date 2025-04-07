const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser');

/**
 * @route   GET /api/flights/users
 * @desc    Get all users (admin only)
 * @access  Private (admin only)
 */
router.get('/users', authenticateUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const users = await User.find({}, 'username email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

/**
 * @route   POST /api/flights
 * @desc    Create a new flight
 * @access  Private (admin only)
 * @body    flightNumber, departure, destination, etc.
 */
router.post('/', authenticateUser, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const existingFlight = await Flight.findOne({ flightNumber: req.body.flightNumber });

    if (existingFlight) {
      return res.status(400).json({ message: 'Flight with this number already exists' });
    }

    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).json({ message: 'Error creating flight', error });
  }
});

/**
 * @route   GET /api/flights
 * @desc    Get all flights
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
});

/**
 * @route   GET /api/flights/:flightNumber
 * @desc    Get a flight by flightNumber
 * @access  Public
 */
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

/**
 * @route   PUT /api/flights/:flightNumber
 * @desc    Update a flight by flightNumber
 * @access  Public (should be protected)
 * @body    Updated flight data
 */
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

/**
 * @route   DELETE /api/flights/:flightNumber
 * @desc    Delete a flight by flightNumber
 * @access  Public (should be admin-only)
 */
router.delete('/:flightNumber', async (req, res) => {
  try {
    const deleted = await Flight.findOneAndDelete({ flightNumber: req.params.flightNumber });

    if (!deleted) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flight', error });
  }
});

module.exports = router;
