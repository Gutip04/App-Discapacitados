import { createContext } from "react";

export interface Usuario {
  id: number;
  email: string;
  rol: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
