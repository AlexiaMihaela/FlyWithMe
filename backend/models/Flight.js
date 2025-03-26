const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    trim: true,
    unique: true
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  departureDate: {
    type: Date,
    required: [true, 'Departure date is required']
  },
  arrivedDate: {
    type: Date,
    required: [true, 'Arrival date is required']
  },
  durationMinutes: {
    type: Number,
    required: [true, 'Flight duration is required'],
    min: [0, 'Duration must be a positive number']
  },
  status: {
    type: String,
    enum: ['on-time', 'delayed', 'cancelled'],
    default: 'on-time'
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats must be specified'],
    min: [1, 'There must be at least 1 seat']
  },
  availableSeats: {
    type: Number,
    required: [true, 'Available seats must be specified'],
    min: [0, 'Available seats cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Ticket price is required'],
    min: [0, 'Price cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
