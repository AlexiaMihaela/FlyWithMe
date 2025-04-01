import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./FlightCard.css";

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-header">
        <span className="flight-number">{flight.flightNumber}</span>
        <span className={`status ${flight.status}`}>{flight.status}</span>
      </div>
      <div className="flight-details">
        <div>
          <p>
            <strong>From:</strong> {flight.origin}
          </p>
          <p>
            <strong>To:</strong> {flight.destination}
          </p>
        </div>
        <div>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(flight.departureDate).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {new Date(flight.arrivedDate).toLocaleString()}
          </p>
        </div>
        <div>
          <p>
            <strong>Duration:</strong> {flight.durationMinutes} minutes
          </p>
        </div>
        <div>
          <p>
            <strong>Available Seats:</strong> {flight.availableSeats}/
            {flight.totalSeats}
          </p>
          <p>
            <strong>Price:</strong> ${flight.price}
          </p>
          {flight.availableSeats > 0 && flight.status !== "cancelled" ? (
            <Link
              to={`/reservation/${flight.flightNumber}`}
              className="book-button"
            >
              Book Now
            </Link>
          ) : (
            <p className="not-bookable">This flight cannot be booked</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
