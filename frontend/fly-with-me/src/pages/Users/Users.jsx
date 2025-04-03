import { useState, useEffect } from 'react';
import { TextInput, Card, Text, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/flights/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="users-container">
        <h2>Users History</h2>
        
        <TextInput
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div className="users-list">
          {filteredUsers.map(user => (
            <Card key={user._id} className="user-card" shadow="sm">
              <Group display="flex" justify="space-between">
                <div>
                  <Text size="lg" weight={500}>{user.username}</Text>
                  <Text size="sm" color="dimmed">{user.email}</Text>
                </div>
                <Link to={`/admin/users/${user._id}`} className="view-history-button">
                  View History
                </Link>
              </Group>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users; 