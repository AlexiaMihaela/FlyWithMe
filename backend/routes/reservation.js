const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");
const authenticateUser = require('../middleware/authenticateUser');

/**
 * @route   POST /api/reservations
 * @desc    Create a new reservation for a flight
 * @access  Private (requires authentication)
 * @body    { flightNumber, seatsReserved, totalPrice }
 * @returns 201 Created with reservation data or error
 */
router.post("/", authenticateUser, async (req, res) => {
  const { flightNumber, seatsReserved, totalPrice } = req.body;

  try {
    const flight = await Flight.findOne({ flightNumber });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (flight.availableSeats < seatsReserved) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    flight.availableSeats -= seatsReserved;
    await flight.save();

    const reservation = new Reservation({
      user: req.user.userId, // user ID from the token
      flightNumber,
      seatsReserved,
      totalPrice,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation", error });
  }
});

/**
 * @route   GET /api/reservations/mine
 * @desc    Get reservations of the authenticated user
 * @access  Private
 * @returns List of reservations for current user
 */
router.get('/mine', authenticateUser, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your reservations", error });
  }
});

/**
 * @route   GET /api/reservations/pending
 * @desc    Get all reservations with status "pending"
 * @access  Public (but ideally should be protected for admin only)
 * @returns List of pending reservations (with populated user info)
 */
router.get("/pending", async (req, res) => {
  console.log("Fetching pending reservations...");
  try {
    const pendingReservations = await Reservation.find({ status: 'pending' }).populate('user');
    res.json(pendingReservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});

/**
 * @route   PATCH /api/reservations/:id/confirm
 * @desc    Confirm a reservation (change status to "confirmed")
 * @access  Public (should be admin ideally)
 * @returns Updated reservation object
 */
router.patch("/:id/confirm", async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error confirming reservation", error });
  }
});

/**
 * @route   PATCH /api/reservations/:id/cancel
 * @desc    Cancel a reservation (status: "cancelled") and restore seats
 * @access  Public (should be admin ideally)
 * @returns Updated reservation
 */
router.patch("/:id/cancel", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const flight = await Flight.findOne({ flightNumber: reservation.flightNumber });
    if (flight) {
      flight.availableSeats += reservation.seatsReserved;
      await flight.save();
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error cancelling reservation", error });
  }
});

/**
 * @route   GET /api/reservations/user/:userId
 * @desc    Get all reservations of a specific user (for admin/staff)
 * @access  Public (should be protected)
 * @returns List of reservations with user info
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reservations", error });
  }
});

module.exports = router;
