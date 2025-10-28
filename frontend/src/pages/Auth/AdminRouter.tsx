import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

interface Props {
  children: React.ReactNode;
}

export function AdminRoute({ children }: Props) {
  const { usuario, cargando: loading } = useAuth(); // 👈 Asegúrate de tener un loading en tu hook

  // Mientras se carga la información del usuario
  if (loading) {
    return <div>Cargando...</div>; // Puedes poner un spinner o componente de carga
  }

  // Si no hay sesión iniciada
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario tiene rol "usuario", no puede acceder
  if (usuario.rol === "usuario") {
    return <Navigate to="/dashboard" replace />;
  }

  // Si es admin o superadmin, permite el acceso
  return <>{children}</>;
}
