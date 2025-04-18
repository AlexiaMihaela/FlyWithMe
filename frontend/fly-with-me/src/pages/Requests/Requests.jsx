import { useEffect, useState } from "react";
import { Button, Card, Text, Checkbox, Group } from "@mantine/core";
import Header from "../../components/header/header";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState(new Set());

  const fetchPending = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reservation/pending");
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        console.error("Unexpected response:", data);
        setRequests([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setRequests([]); // evită crash
    }
  };
  
  const handleAction = async (id, action) => {
    try {
        const response = await fetch(`http://localhost:5000/api/reservation/${id}/${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      fetchPending(); // reîncarcă lista
    } catch (error) {
      console.error(`Error updating status to ${action}:`, error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      const promises = Array.from(selectedRequests).map(id =>
        fetch(`http://localhost:5000/api/reservation/${id}/${action}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      await Promise.all(promises);
      setSelectedRequests(new Set());
      fetchPending(); 
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRequests.size === requests.length) {
      setSelectedRequests(new Set());
    } else {
      setSelectedRequests(new Set(requests.map(req => req._id)));
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedRequests);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRequests(newSelected);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <>
    <Header/>
    <div style={{ padding: "2rem" }}>
      <h2>Pending Reservation Requests</h2>
      
      {requests.length > 0 && (
        <Group mb="md" position="apart">
          <Group>
            <Checkbox
              checked={selectedRequests.size === requests.length}
              indeterminate={selectedRequests.size > 0 && selectedRequests.size < requests.length}
              onChange={toggleSelectAll}
              label="Select All"
            />
            <Text size="sm" color="dimmed">
              {selectedRequests.size} selected
            </Text>
          </Group>
          
          <Group>
            <Button
              color="green"
              disabled={selectedRequests.size === 0}
              onClick={() => handleBulkAction("confirm")}
            >
              Accept Selected
            </Button>
            <Button
              color="red"
              disabled={selectedRequests.size === 0}
              onClick={() => handleBulkAction("cancel")}
            >
              Reject Selected
            </Button>
          </Group>
        </Group>
      )}

      {requests.length === 0 && <p>No pending requests.</p>}
      {requests.map((req) => (
        <Card key={req._id} shadow="sm" padding="lg" mb="md" withBorder>
          <Group position="apart" mb="xs">
            <Checkbox
              checked={selectedRequests.has(req._id)}
              onChange={() => toggleSelect(req._id)}
            />
            <Text>Select</Text>
          </Group>
          <Text><strong>User:</strong> {req.user?.name || req.user?.email || req.user}</Text>
          <Text><strong>Flight:</strong> {req.flightNumber}</Text>
          <Text><strong>Seats:</strong> {req.seatsReserved}</Text>
          <Text><strong>Total Price:</strong> ${req.totalPrice}</Text>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <Button color="green" onClick={() => handleAction(req._id, "confirm")}>
              Accept
            </Button>
            <Button color="red" onClick={() => handleAction(req._id, "cancel")}>
              Reject
            </Button>
          </div>
        </Card>
      ))}
    </div>
    </>
  );
};

export default RequestsPage;
