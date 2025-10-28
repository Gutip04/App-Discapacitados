import { useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { AuthContext, type Usuario } from "./AuthContext";


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    AuthService.check()
      .then((res) => setUsuario(res.data.usuario))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  const login = async (email: string, password: string) => {
    await AuthService.login(email, password);
    const res = await AuthService.check();
    setUsuario(res.data.usuario);
    return res.data.usuario
  };

  const logout = async () => {
    await AuthService.logout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
