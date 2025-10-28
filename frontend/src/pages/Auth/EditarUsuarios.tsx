import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";
import { AuthService } from "../../services/AuthService";
import EditarPassword from "./EditarPassword";
import { useAuth } from "../../hooks/UseAuth";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: number;
}

export default function EditarUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");
  const { usuario: usuarioLogueado  } = useAuth()

  // Obtener datos del usuario
  useEffect(() => {
    if (!id) return;

    AuthService.obtenerUsuarioPorId(Number(id))
      .then((res: { data: Usuario }) => {
        setUsuario(res.data);
      })
      .catch((err: unknown) => {
        console.error("Error al obtener el usuario", err);
        setMensaje("Error al obtener el usuario");
        setTipoMensaje("error");
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    console.log("Usuario a editar:", usuario);
    AuthService.editarUsuario(Number(id), {
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
    })
      .then(() => {
        setMensaje("Usuario actualizado correctamente");
        setTipoMensaje("success");

        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al editar", error);
          if (error.response?.status === 409) {
            // Mensaje específico para conflicto de email
            setMensaje("Ya existe un usuario con ese correo");
        } else {
            setMensaje("Ocurrió un error al actualizar el usuario");
        }
        setTipoMensaje("error");

        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      });
  };

  return (
   <>
  <div className="p-6 max-w-7xl mx-auto">
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row md:space-x-6">
      
      {/* Formulario de usuario */}
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">
          Editar Usuario
        </h1>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`mb-4 p-3 rounded-lg text-white ${
              tipoMensaje === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {mensaje}
          </div>
        )}

        {usuario && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <InputField
              label="Nombre"
              value={usuario.nombre}
              onchange={(e) =>
                setUsuario({ ...usuario, nombre: e.target.value })
              }
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              value={usuario.email}
              onchange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
            />

            {/* Rol */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Rol
              </label>
              <select
                value={usuario.rol}
                onChange={(e) =>
                  setUsuario({ ...usuario, rol: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="usuario">Usuario</option>
                {usuarioLogueado?.rol === "superAdmin" && (
                    <option value="admin">Administrador</option>
                )}
              </select>
            </div>

            {/* Activo */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Estado
              </label>
              <select
                value={usuario.activo}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    activo: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>

            {/* Botón Guardar */}
            <BotonFormulario
              tipo="submit"
              texto="Guardar Cambios"
              color="blue"
              fullWidth={true}
              py={2}
            />
          </form>
        )}
      </div>

        {usuarioLogueado?.rol === "superAdmin" && (
            <div className="mt-6 md:mt-0 w-full md:w-1/3">
              {usuario && <EditarPassword id={usuario.id} />}
            </div>      
)}
      {/* Cambiar contraseña */}
    </div>
  </div>
</>

  );
}
