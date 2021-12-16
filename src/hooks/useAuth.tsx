import { useContext } from "react";
import { AuthContext } from "../components/admin/AuthProvider";

export default function useAuth() {
  return useContext(AuthContext);
}
