import { useEffect, useState, useRef } from "react";
import { Card, Text, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Header from "../../components/header/header";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const hasNotified = useRef(false); // ✅ pentru a preveni notificări duplicate

  const fetchReservations = async () => {
    console.log("📦 Fetching reservations..."); // test vizual

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/reservation/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (Array.isArray(data)) {
      setReservations(data);

      // ✅ Notificăm o singură dată, indiferent de rerandări
      if (!hasNotified.current) {
        hasNotified.current = true;

        const seenFlights = new Set();

        data.forEach((r) => {
          if (
            (r.status === "confirmed" || r.status === "cancelled") &&
            !seenFlights.has(r.flightNumber)
          ) {
            seenFlights.add(r.flightNumber);

            showNotification({
              title: r.status === "confirmed" ? "Rezervare confirmată!" : "Rezervare refuzată",
              message: `Zborul ${r.flightNumber} a fost ${
                r.status === "confirmed" ? "aprobat ✅" : "refuzat ❌"
              }`,
              color: r.status === "confirmed" ? "green" : "red",
              icon: r.status === "confirmed" ? <IconCheck /> : <IconX />,
              autoClose: 4000,
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
    <Header/>
    <div style={{ padding: "2rem" }}>
      <h2>My Reservations</h2>
      {reservations.length === 0 && <p>No reservations yet.</p>}
      {reservations.map((r) => (
        <Card key={r._id} shadow="sm" padding="lg" mb="md" withBorder>
          <Text>
            <strong>Flight:</strong> {r.flightNumber}
          </Text>
          <Text>
            <strong>Seats:</strong> {r.seatsReserved}
          </Text>
          <Text>
            <strong>Total Price:</strong> ${r.totalPrice}
          </Text>
          <Group mt="sm">
            <Badge
              color={
                r.status === "confirmed"
                  ? "green"
                  : r.status === "cancelled"
                  ? "red"
                  : "yellow"
              }
            >
              {r.status}
            </Badge>
          </Group>
        </Card>
      ))}
    </div>
    </>
  );
};

export default Reservations;
