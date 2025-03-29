import { Navigate } from 'react-router-dom';

export const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <Navigate to="/user" />;
  }

  return children;
};

export const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}; 