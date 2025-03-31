import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MakeReservation.css';

import { jwtDecode } from 'jwt-decode';


const token = localStorage.getItem('token');
let userId = '';
if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId ;
    console.log('Decoded user ID:', userId);

  }

const MakeReservation = () => {
  const { flightNumber } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchFlight = async () => {
      const response = await fetch(`http://localhost:5000/api/admin/flights/${flightNumber}`);
      const data = await response.json();
      setFlight(data);
      setTotalPrice(data.price);
    };

    fetchFlight();
  }, [flightNumber]);

  useEffect(() => {
    if (flight) {
      setTotalPrice(seats * flight.price);
    }
  }, [seats, flight]);

  const handleReservation = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch('http://localhost:5000/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // 👈 Asta e cheia!
        },
        body: JSON.stringify({
          flightNumber: flight.flightNumber,
          seatsReserved: seats,
          totalPrice,
        }),
      });
  
      if (response.ok) {
        alert('Reservation created!');
        navigate('/user');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Error making reservation:', err);
    }
  };
  if (!flight) return <p>Loading flight details...</p>;

  return (
    <div className="reservation-container">
      <h2>Reserve Flight {flight.flightNumber}</h2>
      <p><strong>From:</strong> {flight.origin}</p>
      <p><strong>To:</strong> {flight.destination}</p>
      <p><strong>Departure:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
      <p><strong>Price per seat:</strong> ${flight.price}</p>
      <p><strong>Seats Available:</strong> {flight.availableSeats}</p>

      <label>How many seats?</label>
      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        min={1}
        max={flight.availableSeats}
      />

      <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>

      <button onClick={handleReservation}>Request Reservation</button>
    </div>
  );
};

export default MakeReservation;
