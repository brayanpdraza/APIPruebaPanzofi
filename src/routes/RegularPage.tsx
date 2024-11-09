import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegularPage.css'; // Asegúrate de tener esta ruta correcta

interface Config {
    apiUrl: string;
}
interface Project {
    ID_MT_Landing_Page: BigInteger
    Imagen: string;        
    Titulo: string;  
    Descripcion: string; 
}

interface ButtonResponse {
    message: string;
  }
  
export default function RegularPage(){
    const [project, setProject] = useState<Project | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState(''); // Mensaje de éxito/error
    const [error, setError] = useState<string | null>(null);
    const [errorBoton, setErrorBoton] = useState<string | null>(null);
    const [apiUrl, setAPIUrl] = useState<string>('');
    const [timeCount, setTimeCount] = useState(0); // Contador de tiempo

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
    
        const fetchDataProject = async () => {
          try {
            const response = await fetch(`${apiUrl}/API/MT_Landing_Page/1/`, {
              method: 'GET'
            });
    
            if (!response.ok) {
              throw new Error('No se pudo obtener la información de los usuarios.');
            }
    
            const data = await response.json();
            setProject(data);
            
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchDataProject();
      }, [apiUrl, sessionToken]);

      useEffect(() => {
        const interval = setInterval(() => {
          setTimeCount(prevCount => {
            const newCount = prevCount + 1;
            updateTimeCount(); 
            return newCount;
          });
        }, 60000);
    
        return () => clearInterval(interval);
      }, [timeCount]); 
    

    const updateTimeCount = async () => {

        try {
        const response = await fetch(`${apiUrl}/IncTime`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionToken}`,
            },
            body: JSON.stringify({
            tiempo: timeCount, // Mandar el contador actualizado
            }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el tiempo');
        }
        } catch (error) {
        console.error('Error al actualizar el tiempo:', error);
        } finally {
            console.log("Tiempo Aumentado");
        }
    };
      const handleClick = async (buttonNumber: number) => {
        if (loading) return; // Evitar hacer clic mientras se procesa la solicitud
    
        setLoading(true);
        setMessage('Procesando...'); // Mensaje de carga
    
        try {
          const response = await fetch(`${apiUrl}/IncBoton`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${sessionToken}`,
            },
            body: JSON.stringify({ Boton: buttonNumber }),
          });
    
          if (!response.ok) {
            throw new Error('No se pudo actualizar el contador');
          }
    
          const data: ButtonResponse = await response.json();
          setMessage(`¡Botón ${buttonNumber} aumentado!`); // Mensaje de éxito
        } catch (error: any) {
          setMessage('Hubo un error al procesar la solicitud.');
          setErrorBoton(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
          setLoading(false); // Rehabilitar los botones
        }
      };

      if (loading) {
        return <div>Cargando...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }


    return(
        <div>
        {/* Contenedor de la imagen y el texto */}
        <div className="project-container">
            <img 
                src={project ? project.Imagen : 'https://via.placeholder.com/150'} 
                alt={project ? project.Titulo : 'Error de carga'} 
                className="project-image" 
            />
            <div>
                <h1>{project ? project.Titulo : 'Sin título'}</h1>
                <p>{project ? project.Descripcion : 'No hay descripción disponible'}</p>
            </div>
        </div>

        {/* Contenedor de los botones */}
        <div className="button-container">
            <button
                disabled={loading}
                onClick={() => handleClick(1)}
                className="button button-1"
            >
                Botón 1
            </button>
            <button
                disabled={loading}
                onClick={() => handleClick(2)}
                className="button button-2"
            >
                Botón 2
            </button>
        </div>

        {/* Indicador de carga */}
        {loading && <div className="loading">Loading...</div>}

        {/* Mensajes de estado */}
        {message && <div className="success-message">{message}</div>}
        {errorBoton && <div className="error-message">{errorBoton}</div>}
    </div>
    );
}