import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import './AdminPage.css';
import Header from '../../components/header/header';

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

  const handleDelete = async (flightNumber) => {
  
    const confirmDelete = window.confirm(`Delete flight ${flightNumber}?`);
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/admin/flights/${flightNumber}`, {
        method: 'DELETE',
      });
  
      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.warn('Non-JSON response received');
        data = { message: 'Non-JSON response received (possibly HTML or 404)' };
      }
  
      if (response.ok) {
        setFlights((prev) => prev.filter((f) => f.flightNumber !== flightNumber));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };
  
  
  return (
    <>
    <Header/>
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
        <Link to={`/admin/create-flight`} className="edit-button">Add Flight</Link>
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
                  <button onClick={() => handleDelete(flight.flightNumber)} className="delete-button">Delete</button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AdminPage;
