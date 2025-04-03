import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Badge, Text } from '@mantine/core';
import Header from '../../components/header/header';
import './UserHistory.css';

const UserHistory = () => {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reservation/user/${userId}`);
        const data = await response.json();
        setReservations(data);
        if (data.length > 0 && data[0].user) {
          setUser(data[0].user);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [userId]);

  return (
    <>
      <Header />
      <div className="user-history-container">
        {user && (
          <div className="user-info">
            <h2>Reservation History for {user.username}</h2>
            <Text color="dimmed">{user.email}</Text>
          </div>
        )}
        {
            !user&&
            <div className="no-reservations-message">
              <Text size="lg" weight={500}>
                No reservations found for this user.
              </Text>
            </div>
        }

        <div className="reservations-list">
          {(
            reservations.map(reservation => (
              <Card key={reservation._id} className="reservation-card" shadow="sm">
                <Text size="lg" weight={500}>Flight {reservation.flightNumber}</Text>
                <Text>Seats: {reservation.seatsReserved}</Text>
                <Text>Total Price: ${reservation.totalPrice}</Text>
                <Badge 
                  color={
                    reservation.status === 'confirmed' ? 'green' : 
                    reservation.status === 'cancelled' ? 'red' : 'yellow'
                  }
                >
                  {reservation.status}
                </Badge>
                <Text size="sm" color="dimmed">
                  Created: {new Date(reservation.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserHistory; 