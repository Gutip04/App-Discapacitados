import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderLandingPage() {
  const { usuario, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleDropdown = () => setDropdownAbierto(!dropdownAbierto);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAbierto(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md fixed w-full z-50 transition-all">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-slate-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          App de Discapacitación
        </h1>

        {/* Menú de escritorio */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <a href="#inicio" className="hover:text-slate-600 transition">
              Inicio
            </a>
          </li>
          <li>
            <a href="#beneficios" className="hover:text-slate-600 transition">
              Funcionalidades
            </a>
          </li>
          <li>
            <a href="#sobre" className="hover:text-slate-600 transition">
              Sobre la App
            </a>
          </li>
          <li>
            <a href="#contacto" className="hover:text-slate-600 transition">
              Contacto
            </a>
          </li>
        </ul>

        {/* Usuario o botón ingresar */}
        <div className="hidden md:flex items-center space-x-3 relative" ref={dropdownRef}>
          {usuario ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 border border-slate-500 text-slate-700 px-3 py-1 rounded-lg hover:bg-teal-50 transition"
              >
                <User size={18} />
                <span className="font-medium">{usuario.email}</span>
              </button>

              {/* Menú desplegable */}
              {dropdownAbierto && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fadeIn">
                  <p className="px-4 text-sm text-gray-500 mb-1">
                    Rol:{" "}
                    <span className="font-semibold text-gray-700">
                      {usuario.rol}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownAbierto(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-teal-50 transition"
                  >
                    Ir al Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownAbierto(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <a
              href="/login"
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Ingresar
            </a>
          )}
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-slate-600 hover:text-slate-800 transition"
        >
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
            <li>
              <a href="#inicio" className="hover:text-slate-600" onClick={toggleMenu}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#beneficios" className="hover:text-slate-600" onClick={toggleMenu}>
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-slate-600" onClick={toggleMenu}>
                Sobre la App
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-slate-600" onClick={toggleMenu}>
                Contacto
              </a>
            </li>

            {usuario ? (
              <>
                <p className="text-sm text-gray-600">{usuario.email}</p>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    toggleMenu();
                  }}
                  className="bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Ir al Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <a
                href="/login"
                onClick={toggleMenu}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                Ingresar
              </a>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
