import { createContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Jwt } from "../../store/models/auth";
import { AppState } from "../../store/reducers";
import { AuthState } from "../../store/reducers/auth.reducer";

export const AuthContext = createContext<boolean | Jwt>(false);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useSelector<AppState, AuthState>((state) => state.auth);

  return (
    <AuthContext.Provider value={auth.jwt}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
