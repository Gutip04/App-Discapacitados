import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService"; // Ajusta la ruta según tu estructura
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";
// import { set } from "zod/v3";

export default function RegisterPage() {
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario",
  });

  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const { usuario } = useAuth()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCargando(true);

    try {
      // ✅ Llamamos a tu AuthService
      const res = await AuthService.register(
        formData.nombre,
        formData.email,
        formData.password,
        formData.rol
      );

      setMensaje(res.data.mensaje || "Usuario registrado correctamente");

      setTimeout(() => setMensaje(""),3000)
      //  Redirigir después de un breve retraso
    //   setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error al registrar usuario");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      setTimeout(() => setError(""),5000)
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Crear Cuenta
        </h2>

        {error && <p className="text-white bg-red-500 text-center mb-3 p-2 rounded-md">{error}</p>}
        {mensaje && <p className="text-white bg-green-600 text-center mb-3 p-2 rounded-md ">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="usuario">Usuario</option>
              {usuario?.rol === "superAdmin" && (
                  <option value="admin">Administrador</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition"
          >
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/auth/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Inicia sesión
          </a>
        </p> */}
      </div>
    </div>
  );
}
