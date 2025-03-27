import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import './AdminPage.css';

const AdminPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/flights');
        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin - Flight Management</h2>

      {/* Search filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Origin"
          value={searchOrigin}
          onChange={(e) => setSearchOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Destination"
          value={searchDestination}
          onChange={(e) => setSearchDestination(e.target.value)}
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="on-time">On-time</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button disabled>Search (coming soon)</button>
      </div>

      {/* Flight cards */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flight-list">
          {flights.map((flight) => (
            <div className="flight-card" key={flight._id} >
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
                <p><strong>Time:</strong> {flight.durationMinutes.toLocaleString()} minutes </p>
                  </div>
                <div>
                  <p><strong>Seats:</strong> {flight.availableSeats}/{flight.totalSeats}</p>
                  <p><strong>Price:</strong> ${flight.price}</p>
                  <Link to={`/admin/flight/${flight.flightNumber}`} className="edit-button">Edit</Link>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
