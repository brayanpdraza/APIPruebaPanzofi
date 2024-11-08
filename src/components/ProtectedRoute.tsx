import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const sessionToken = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionToken='));
    const userLevel = document.cookie.split('; ').find(cookie => cookie.startsWith('userLevel='));

    const isLoggedIn = sessionToken !== undefined;
    const userRoleFromCookie = userLevel ? parseInt(userLevel.split('=')[1]) : null;

    setIsAuthenticated(isLoggedIn);
    setUserRole(userRoleFromCookie);

    setIsLoading(false);

    if (!isLoggedIn) {
      navigate("/", { replace: true }); 
    } else if (userRoleFromCookie === 1) {
      navigate("/InicioSesion/AdminPage"); 
    } else {
      navigate("/InicioSesion/RegularPage"); 
    }
  }, [location.pathname,navigate]); 

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return <Outlet />;
};

export default ProtectedRoute;