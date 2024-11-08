import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate   } from "react-router-dom";
import '../css/LoginForm.css'; // Asegúrate de crear este archivo CSS

interface Config {
  apiUrl: string;
}

const LoginForm: React.FC = () => {
  // Definimos los tipos de los estados
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiUrl, setAPIUrl] = useState<string>('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`/config.json`);
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        const config: Config = await response.json();
        if (!config.apiUrl) {
          throw new Error('La variable global URL está vacía o no existe');
        }
        setAPIUrl(config.apiUrl);
      } catch (error) {
        setError(`Error: ${error instanceof Error ? error.message : 'Desconocido'}`);
      }
    };

    fetchConfig();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return; //previene clicks rapidos

    setLoading(true);
    if (username === null || password === null) {
        setError('Por favor ingresa ambos campos.');
        setLoading(false);
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Nombre_Usuario: username, Clave: password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        const sessionToken = data.token;
        const idMTPerfiles = data.usuario.ID_MT_Perfiles; // Suponiendo que el ID de perfiles viene en el objeto de usuario
        
        document.cookie = `sessionToken=${sessionToken}; path=/;`;

        const perfilResponse = await fetch(`${apiUrl}/API/Perfil/${idMTPerfiles}/`, {
            method: 'GET',

        });

        const perfilData = await perfilResponse.json();
        if (!perfilResponse.ok) {
            throw new Error(perfilData.message || 'Error al obtener la jerarquía');
        }

        const jerarquia = perfilData.Jerarquia; // Obtener la jerarquía del perfil
        
        // Guardar jerarquía en las cookies
        document.cookie = `userLevel=${jerarquia}; path=/;`;

        navigate('/InicioSesion'); // Redirige al usuario tras el login exitoso

    } catch (error) {
        setError(`Error al iniciar sesión: ${error instanceof Error ? error.message : 'Desconocido'}`);
    } finally {
        setLoading(false);
    }
};
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Introduce tu usuario"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Introduce tu contraseña"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;