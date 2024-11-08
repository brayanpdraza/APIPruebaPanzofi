import { createHashRouter } from 'react-router-dom';
import Home from '../routes/Home';
import InicioSesion from '../routes/InicioSesion';
import AdminPage from '../routes/AdminPage';
import RegularPage from '../routes/RegularPage';
import Error from '../routes/Error';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createHashRouter([
    {
      path: '/',
      element: <Home />,  // Página de login (Home)
      errorElement: <Error />,  // Página de error
    },
    {
      path: '/InicioSesion',
      element: <InicioSesion />,  // Página de inicio de sesión (padre)
      children: [
        {
          path: '', // Esta es la ruta base para "/InicioSesion"
          element: <ProtectedRoute />,  // Proteger las rutas internas de InicioSesion
          children: [
            {
              path: 'AdminPage',  // Página de administración (solo para jerarquía 1)
              element: <AdminPage />,
            },
            {
              path: 'RegularPage',  // Página para usuarios regulares
              element: <RegularPage />,
            },
          ],
        },
      ],
    },
  ]);
  


  export default router