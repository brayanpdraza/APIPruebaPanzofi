import React from 'react';
import { Outlet } from 'react-router-dom';
import '../css/InicioSesion.css';

const InicioSesion: React.FC = () => {
  return (
    <div className="inicio-sesion-container">
      <h1 className="inicio-sesion-titulo">Bienvenido</h1>
      <div className="inicio-sesion-content">
        <Outlet />
      </div>
    </div>
  );
};

export default InicioSesion;