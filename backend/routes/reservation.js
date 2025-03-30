const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Flight = require("../models/Flight");

// router.post("/", async (req, res) => {
//   const { flightNumber, seatsReserved, user, totalPrice } = req.body;

//   try {
//     // 1. Găsim zborul
//     const flight = await Flight.findOne({ flightNumber });

//     if (!flight) {
//       return res.status(404).json({ message: "Flight not found" });
//     }

//     // 2. Verificăm locuri disponibile
//     if (flight.availableSeats < seatsReserved) {
//       return res.status(400).json({ message: "Not enough seats available" });
//     }

//     // 3. Scădem locurile și salvăm zborul
//     flight.availableSeats -= seatsReserved;
//     await flight.save();

//     // 4. Creăm rezervarea
//     const reservation = new Reservation({
//       user,
//       flightNumber,
//       seatsReserved,
//       totalPrice,
//     });

//     await reservation.save();

//     res.status(201).json(reservation);
//   } catch (error) {
//     console.error("Error creating reservation:", error);
//     res.status(500).json({ message: "Error creating reservation", error });
//   }
// });

const authenticateUser = require('../middleware/authenticateUser');

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
      user: req.user.userId, // 👈 user real din token
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


router.get("/pending", async (req, res) => {
  console.log("Fetching pending reservations...");
  try {
    const pendingReservations = await Reservation.find({ status: 'pending' }).populate('user');
    res.json(pendingReservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});
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
router.patch("/:id/cancel", async (req, res) => {
  try {
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


module.exports = router;
