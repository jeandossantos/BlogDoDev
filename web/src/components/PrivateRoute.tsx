import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './Loading';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { loading } = useAuth();
  const user = localStorage.getItem('@blog:payload');

  if (loading) return <Loading />;

  return user ? <>{children}</> : <Navigate to={'/'} />;
}
