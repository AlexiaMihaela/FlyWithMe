import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import FlightPage from './pages/FlightPage/FlightPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/flight/:flightNumber" element={<FlightPage />} />
    </Routes>
  );
};

export default App;

