import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to='/signIn' state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
