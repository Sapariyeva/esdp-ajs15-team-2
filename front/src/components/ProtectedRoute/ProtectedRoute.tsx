import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  isAllowed?: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({ isAllowed, redirectPath }: IProps) => {
    if (isAllowed) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
};

export default ProtectedRoute;