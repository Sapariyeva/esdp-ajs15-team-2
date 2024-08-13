import { useAppSelector } from '@/app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAllowed: boolean;
  redirectPath: string;
  allowedRoles?: string[];
}

export function ProtectedRoute({ isAllowed, redirectPath , allowedRoles}: Props) {
  const { user } = useAppSelector((state) => state.user);
  
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user?.role)) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
}
