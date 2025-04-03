import { Routes, Route } from 'react-router-dom';
import { ProtectedAdminRoute, ProtectedUserRoute } from './components/ProtectedRoute/ProtectedRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import FlightPage from './pages/FlightPage/FlightPage';
import CreateFlight from './pages/CreateFlight/CreateFlight';
import MakeReservation from './pages/MakeReservation/MakeReservation';
import '@mantine/core/styles.css'
import UserPage from './pages/UserPage/UserPage';
import Reservations from "./pages/Reservations/Reservations"
import Requests from './pages/Requests/Requests';
import Users from './pages/Users/Users';
import UserHistory from './pages/UserHistory/UserHistory';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/reservations" element={<Reservations/>} />
      <Route path="/requests" element={<Requests/>} />
      <Route 
        path="/admin" 
        element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        } 
      />
      <Route 
        path="/reservation/:flightNumber"
        element={
         <MakeReservation />
        } 
      />
      <Route 
        path="/admin/flight/:flightNumber" 
        element={
          <ProtectedAdminRoute>
            <FlightPage />
          </ProtectedAdminRoute>
        } 
      />
      <Route 
        path="/admin/create-flight" 
        element={
          <ProtectedAdminRoute>
            <CreateFlight />
          </ProtectedAdminRoute>
        } 
      />
      <Route 
        path="/user" 
        element={
          <ProtectedUserRoute>
            <UserPage />
          </ProtectedUserRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedAdminRoute>
            <Users />
          </ProtectedAdminRoute>
        } 
      />
      <Route 
        path="/admin/users/:userId" 
        element={
          <ProtectedAdminRoute>
            <UserHistory />
          </ProtectedAdminRoute>
        } 
      />
    </Routes>
  );
};

export default App;

