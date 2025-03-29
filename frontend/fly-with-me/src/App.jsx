import { Routes, Route } from 'react-router-dom';
import { ProtectedAdminRoute, ProtectedUserRoute } from './components/ProtectedRoute/ProtectedRoute';
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
      <Route 
        path="/admin" 
        element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
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
    </Routes>
  );
};

export default App;

