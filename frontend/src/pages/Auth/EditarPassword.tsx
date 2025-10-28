import { useState } from "react";
import { AuthService } from "../../services/AuthService";

interface Props {
  id: number; // ID del usuario a cambiar contraseña
}

export default function EditarPassword({ id }: Props) {
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevaPassword) {
      setMensaje("La contraseña no puede estar vacía");
      setTipoMensaje("error");
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 5000);
      return;
    }

    AuthService.cambiarPassword(id, nuevaPassword)
      .then(() => {
        setMensaje("Contraseña actualizada correctamente");
        setTipoMensaje("success");

        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
          setNuevaPassword(""); // limpiar input
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al cambiar la contraseña", error);

        if (error.response?.status === 400) {
          setMensaje("La nueva contraseña debe tener al menos 5 caracteres");
        } else {
          setMensaje("Ocurrió un error al actualizar la contraseña");
        }

        setTipoMensaje("error");
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Editar Contraseña</h3>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChange={(e) => setNuevaPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
      >
        Cambiar Contraseña
      </button>
      {mensaje && (
        <p className={`mt-4 text-center ${tipoMensaje === "success" ? "text-green-600" : "text-red-600"}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
}
