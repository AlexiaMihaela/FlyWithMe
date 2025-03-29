import { useEffect, useState } from 'react';
import Weather from "../../components/Weather/Weather";
import FlightCard from "../../components/FlightCard/FlightCard";
import './UserPage.css';

const UserPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');

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
    <div className="user-container">
      <h2>Available Flights</h2>
      <Weather />

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
      </div>

      {/* Flight cards */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flight-list">
          {flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;