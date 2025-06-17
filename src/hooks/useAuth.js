// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
