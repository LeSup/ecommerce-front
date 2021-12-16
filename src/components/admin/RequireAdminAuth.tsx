import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Jwt } from "../../store/models/auth";

const RequireAdminAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth || (auth as Jwt).user.role !== 1) {
    return <Navigate to='/signIn' state={{ from: location }} />;
  }
  return children;
};

export default RequireAdminAuth;
