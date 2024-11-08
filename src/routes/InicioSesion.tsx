import React from 'react';
import { Outlet } from 'react-router-dom';

const InicioSesion: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido</h1>
      {/* Aquí se renderizará la página hija dependiendo del ProtectedRoute */}
      <Outlet />
    </div>
  );
};

export default InicioSesion;