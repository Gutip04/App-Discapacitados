import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <header className="bg-slate-800 text-white shadow-md">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo o título */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-indigo-200 transition"
          onClick={() => navigate("/dashboard")}
        >
          Panel de Control
        </h1>

        {/* Botón menú móvil */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-500 transition"
          onClick={toggleMenu}
        >
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú en escritorio */}
        {usuario && (
          <div className="hidden md:flex items-center gap-6">
            <p className="text-sm">
              {usuario.email} |{" "}
              <span className="capitalize font-semibold">{usuario.rol}</span>
            </p>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && usuario && (
        <div className="md:hidden bg-slate-800 border-t border-slate-600">
          <div className="flex flex-col items-center px-6 py-3 space-y-3">
            <p className="text-sm">
              {usuario.email} |{" "}
              <span className="capitalize font-semibold">{usuario.rol}</span>
            </p>
            <button
              onClick={() => {
                navigate("/dashboard");
                setMenuAbierto(false);
              }}
              className="w-full  px-4 py-2 rounded hover:bg-slate-500 transition text-center"
            >
              Ir al Dashboard
            </button>
            <button
              onClick={logout}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
