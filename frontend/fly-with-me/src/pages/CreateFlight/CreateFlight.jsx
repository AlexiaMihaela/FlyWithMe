import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateFlight.css';

const CreateFlight = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureDate: '',
    arrivedDate: '',
    durationMinutes: '',
    status: 'on-time',
    totalSeats: '',
    availableSeats: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating flight:', error);
    }
  };

  return (
    <div className="create-flight-container">
      <h2>Create New Flight</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <label>Flight Number:</label>
        <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} required />

        <label>Origin:</label>
        <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />

        <label>Destination:</label>
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />

        <label>Departure:</label>
        <input type="datetime-local" name="departureDate" value={formData.departureDate} onChange={handleChange} required />

        <label>Arrival:</label>
        <input type="datetime-local" name="arrivedDate" value={formData.arrivedDate} onChange={handleChange} required />

        <label>Duration (minutes):</label>
        <input type="number" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="on-time">On-time</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>Total Seats:</label>
        <input type="number" name="totalSeats" value={formData.totalSeats} onChange={handleChange} required />

        <label>Available Seats:</label>
        <input type="number" name="availableSeats" value={formData.availableSeats} onChange={handleChange} required />

        <label>Price ($):</label>
        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="button" onClick={() => navigate('/admin')} className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateFlight;
