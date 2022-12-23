import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const user = localStorage.getItem('@blog:payload');

  return user ? <>{children}</> : <Navigate to={'/'} />;
}
