import { useNavigate,useRouteError } from 'react-router-dom';

export default function Error(){
    const navigate = useNavigate();
    const error = useRouteError();

    const handleRedirect = () => {
        navigate('/'); 
    };

    const errorMessage = (() => {
        if (error instanceof Response) {
            return `Error ${error.status}: ${error.statusText}`;
        } else if (error && typeof error === "object" && "message" in error) {
            return (error as Error).message; 
        } else {
            return "Error desconocido";
        }
    })();

    return(
        <div>
            <h1>Error, ruta no existente</h1>
            <p>{errorMessage}</p>
            <button onClick={handleRedirect}>Regresar A Inicio</button>
        </div>
    );
}