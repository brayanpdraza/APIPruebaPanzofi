import React from 'react';
import LoginForm from '../components/LoginForm'; // Importamos el componente LoginForm
import '../css/Home.css'; // Asegúrate de crear este archivo CSS

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la aplicación</h1>
      <p>Por favor, inicia sesión para continuar</p>
      
      {/* Incrustamos el formulario de inicio de sesión */}
      <LoginForm />
    </div>
  );
};

export default Home;