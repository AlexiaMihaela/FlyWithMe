import { useEffect, useState } from "react";
import Weather from "../../components/Weather/Weather";
import FlightCard from "../../components/FlightCard/FlightCard";
import "./UserPage.css";

const UserPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrigin, setSearchOrigin] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/flights");
        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const filteredFlights = flights.filter((flight) => {
    const matchesOrigin = flight.origin
      .toLowerCase()
      .includes(searchOrigin.toLowerCase());
    const matchesDestination = flight.destination
      .toLowerCase()
      .includes(searchDestination.toLowerCase());

    let matchesDate = true;
    if (departureDate) {
      const flightDate = new Date(flight.departureDate)
        .toISOString()
        .split("T")[0];
      matchesDate = flightDate === departureDate;
    }

    return matchesOrigin && matchesDestination && matchesDate;
  });

  return (
    <div className="user-container">
      <h2>Available Flights</h2>
      <Weather />

      {/* Updated search filters */}
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
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredFlights.length > 0 ? (
        <div className="flight-list">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))}
        </div>
      ) : (
        <p>No flights are matching your search.</p>
      )}
    </div>
  );
};

export default UserPage;
