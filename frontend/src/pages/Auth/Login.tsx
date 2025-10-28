import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const {usuario, login} = useAuth()
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // si ya hay usuario logueado, redirige al dashboard
  useEffect(() => {
    if (usuario) {
      navigate("/dashboard/", { replace: true });
    }
  }, [usuario, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
       await login(email, password);
       navigate("/dashboard"); // redirige al dashboard
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error al iniciar sesión");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-600">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Iniciar Sesión
        </h1>

        {error && (
          <p className="text-white text-center mb-4 font-medium bg-red-500 p-4 rounded-md">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-700"
            }`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>


      </div>
    </div>
  );
}
