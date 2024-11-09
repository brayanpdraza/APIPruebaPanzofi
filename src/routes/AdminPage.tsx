import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import '../css/AdminPage.css'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

interface Config {
  apiUrl: string;
}

interface Usuario {
  id: number;
  Nombre_Usuario: string;
  Inicio_Sesion: string;
  Tiempo: number;
  Boton_1: number;
  Boton_2: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setAPIUrl] = useState<string>('');

  const sessionToken = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionToken='))?.split('=')[1] || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken) {
      navigate('/');
      return;
    }

    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
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
  }, [sessionToken, navigate]);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${apiUrl}/usuarios_sesion`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${sessionToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener la información de los usuarios.');
        }

        const data = await response.json();
        const processedData = data.map((item: any) => ({
          id: item.ID_Usuarios_Sesion,
          Nombre_Usuario: item.Nombre_Usuario,
          Inicio_Sesion: item.Inicio_Sesion,
          Tiempo: item.Tiempo,
          Boton_1: item.Boton_1,
          Boton_2: item.Boton_2,
        }));

        setUsuarios(processedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [apiUrl, sessionToken]);

  const barData = {
    labels: usuarios.map(usuario => usuario.Nombre_Usuario),
    datasets: [
      {
        label: 'Tiempo de Sesión',
        data: usuarios.map(usuario => usuario.Tiempo), // Asegúrate de convertir a número si es string
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const pieData = {
    labels: ['Botón 1', 'Botón 2'],
    datasets: [
      {
        label: 'Uso de Botones',
        data: [
          usuarios.reduce((acc: number, usuario: Usuario) => acc + usuario.Boton_1, 0),
          usuarios.reduce((acc: number, usuario: Usuario) => acc + usuario.Boton_2, 0),
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-page-container">
      <h2>Lista de Usuarios</h2>
      <div className="table-container">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Inicio de Sesión</th>
                <th>Tiempo de Sesión</th>
                <th>Botón 1</th>
                <th>Botón 2</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.Nombre_Usuario}</td>
                  <td>{usuario.Inicio_Sesion}</td>
                  <td>{usuario.Tiempo}</td>
                  <td>{usuario.Boton_1}</td>
                  <td>{usuario.Boton_2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Gráficos */} 
      <div className="charts"> 
        <div className="chart"> 
          <h2>Tiempo de Sesión por Usuario</h2> 
          <div className="bar-chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <div className="chart"> 
          <h2>Uso Total de Botones</h2> 
          <Pie data={pieData} /> 
        </div> 
      </div>
    </div>
  );
};

export default AdminPage;