import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  userRole: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, userRole, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in protected routes")
    if (!allowedRoles.includes(userRole)) {
      navigate('/not-authorized');  // Redirect to not authorized page or home page
    }
  }, [allowedRoles, userRole, navigate]);

  return <>{allowedRoles.includes(userRole) ? children : null}</>;
};

export {ProtectedRoute}