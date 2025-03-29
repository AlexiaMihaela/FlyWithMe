import PropTypes from 'prop-types';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-header">
        <span className="flight-number">{flight.flightNumber}</span>
        <span className={`status ${flight.status}`}>{flight.status}</span>
      </div>
      <div className="flight-details">
        <div>
          <p><strong>From:</strong> {flight.origin}</p>
          <p><strong>To:</strong> {flight.destination}</p>
        </div>
        <div>
          <p><strong>Departure:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
          <p><strong>Arrival:</strong> {new Date(flight.arrivedDate).toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Duration:</strong> {flight.durationMinutes} minutes</p>
        </div>
        <div>
          <p><strong>Available Seats:</strong> {flight.availableSeats}/{flight.totalSeats}</p>
          <p><strong>Price:</strong> ${flight.price}</p>
          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.shape({
    flightNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    departureDate: PropTypes.string.isRequired,
    arrivedDate: PropTypes.string.isRequired,
    durationMinutes: PropTypes.number.isRequired,
    availableSeats: PropTypes.number.isRequired,
    totalSeats: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default FlightCard; 