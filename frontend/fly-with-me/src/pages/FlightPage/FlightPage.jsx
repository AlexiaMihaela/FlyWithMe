import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './FlightPage.css';

const FlightPage = () => {
  const { flightNumber } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFlight = async () => {
      const response = await fetch(`http://localhost:5000/api/admin/flights/${flightNumber}`);
      const data = await response.json();
      setFlight(data);
      setFormData(data); // inițializează formularul cu datele curente
    };

    fetchFlight();
  }, [flightNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/admin/flights/${flightNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  if (!flight) return <p>Loading flight...</p>;

  return (
    <div className="flight-edit-container">
      <h2>Edit Flight: {flight.flightNumber}</h2>

      <form className="flight-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>From:</label>
          <input name="origin" type="text" value={formData.origin || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>To:</label>
          <input name="destination" type="text" value={formData.destination || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Duration (minutes):</label>
          <input name="durationMinutes" type="number" value={formData.durationMinutes || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status || ''} onChange={handleChange}>
            <option value="on-time">On-time</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label>Departure:</label>
          <input
            name="departureDate"
            type="datetime-local"
            value={formData.departureDate?.slice(0, 16) || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Arrival:</label>
          <input
            name="arrivedDate"
            type="datetime-local"
            value={formData.arrivedDate?.slice(0, 16) || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price ($):</label>
          <input name="price" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Available Seats:</label>
          <input name="availableSeats" type="number" value={formData.availableSeats || ''} onChange={handleChange} />
        </div>

        <div className="form-buttons">
          <Link to="/admin" className="cancel-button">Cancel</Link>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default FlightPage;
