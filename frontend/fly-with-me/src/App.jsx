import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import FlightPage from './pages/FlightPage/FlightPage';
import CreateFlight from './pages/CreateFlight/CreateFlight';
import '@mantine/core/styles.css'
import UserPage from './pages/UserPage/UserPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/flight/:flightNumber" element={<FlightPage />} />
      <Route path="/admin/create-flight" element={<CreateFlight />} />
      <Route path="/user" element={<UserPage/>} />
    </Routes>
  );
};

export default App;

