import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Obtenemos las cookies
  const sessionToken = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionToken='));
  const userLevel = document.cookie.split('; ').find(cookie => cookie.startsWith('userLevel='));

  const isLoggedIn = sessionToken !== undefined;  // Si tiene el token, está logueado
  const userHierarchy = userLevel ? parseInt(userLevel.split('=')[1]) : null;
  console.log(userHierarchy)
  if (!isLoggedIn) {
    // Si no está logueado, redirigimos al home
    return <Navigate to="/" />;
  }

  if (userHierarchy === 1) {
    // Si es admin (jerarquía 1), renderizamos la página de admin
    return <Navigate to="/InicioSesion/AdminPage" />;
  }

  // Si es usuario regular (jerarquía distinta de 1), renderizamos la página de usuario regular
  return <Navigate to="/InicioSesion/RegularPage" />;
};

export default ProtectedRoute;