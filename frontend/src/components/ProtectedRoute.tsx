import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p>Cargando...</p>; 

  
  // si no hay usuario, redirige al login
  if (!usuario) return <Navigate to="/" replace />;

  // si hay usuario, muestra el contenido protegido
  return <>{children}</>;
}
