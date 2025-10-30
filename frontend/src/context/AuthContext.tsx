import { createContext } from "react";

export interface Usuario {
  id: number;        // Identificador único del usuario
  email: string;     // Correo electrónico del usuario
  rol: string;       // Rol del usuario (ej: "admin", "usuario")
}

export interface AuthContextType {
  usuario: Usuario | null;      // Usuario autenticado o null si no hay sesión
  cargando: boolean;            // Estado de carga durante verificación
  login: (email: string, password: string) => Promise<void>;  // Función de login
  logout: () => Promise<void>;  // Función de logout
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);
