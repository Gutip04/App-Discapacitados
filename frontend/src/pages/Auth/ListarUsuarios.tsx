import React, { useState, useEffect, useCallback } from "react";
import { AuthService } from "../../services/AuthService";
import BotonFormulario from "../../components/ui/BottonFormulario";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useAuth } from "../../hooks/UseAuth";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: number;
}

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  const { usuario } = useAuth();

  // Filtros y paginación
  const [filtros, setFiltros] = useState({ nombre: "", page: 1, limit: 5 });
  const [total, setTotal] = useState(0);

  // Obtener lista de usuarios
const obtenerUsuarios = useCallback(async () => {
  try {
    setLoading(true);
    const { data } = await AuthService.listarUsuarios();

    // Filtrado por nombre (simulado en frontend)
    const filtrados = data.filter((u: Usuario) =>
      u.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
    );

    setTotal(filtrados.length);

    const inicio = (filtros.page - 1) * filtros.limit;
    const fin = inicio + filtros.limit;
    setUsuarios(filtrados.slice(inicio, fin));
  } catch (err) {
    console.error(err);
    setError("Error al cargar los usuarios.");
  } finally {
    setLoading(false);
  }
}, [filtros]);


  useEffect(() => {
    obtenerUsuarios();
  }, [filtros, obtenerUsuarios]);

  // Cambiar búsqueda
  const cambiarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, nombre: e.target.value, page: 1 });
  };

  // Cambiar página
  const cambiarPagina = (nuevaPagina: number) => {
    setFiltros({ ...filtros, page: nuevaPagina });
  };

  // Confirmar eliminación
  const confirmarEliminacion = async () => {
    if (!usuarioAEliminar) return;
    try {
      await AuthService.eliminarUsuario(usuarioAEliminar.id);
      setMensaje(`Usuario ${usuarioAEliminar.nombre} eliminado correctamente.`);
      setTipoMensaje("success");
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      setMensaje(`No se pudo eliminar el usuario ${usuarioAEliminar.nombre}.`);
      setTipoMensaje("error");
    } finally {
      setUsuarioAEliminar(null);
      setTimeout(() => {
        setMensaje("");
        setTipoMensaje("");
      }, 4000);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold uppercase text-gray-800">
          Usuarios
        </h1>

        <BotonFormulario to="/auth/register" texto="Agregar" color="green" px={4} py={2} />
      </div>

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

      {/* Filtro */}
      <input
        type="text"
        value={filtros.nombre}
        onChange={cambiarBusqueda}
        placeholder="Buscar por nombre"
        className="mb-4 w-full px-4 py-2 border rounded-lg shadow-sm"
      />

      {loading && <p className="text-gray-500">Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tabla */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Correo</th>
              <th className="py-3 px-4">Rol</th>
              <th className="py-3 px-4 text-center">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u, index) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-700">{u.nombre}</td>
                <td className="py-3 px-4">{u.email}</td>
                <td className="py-3 px-4 capitalize">{u.rol}</td>
                <td className="py-3 px-4 text-center">
                  {u.activo ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  <BotonFormulario
                    to={`/auth/editarusuario/${u.id}`}
                    texto="Editar"
                    color="blue"
                    py={2}
                    px={4}
                  />
                  {usuario?.rol === "superAdmin" && (
                      <BotonFormulario
                        texto="Eliminar"
                        color="red"
                        py={2}
                        px={4}
                        onClick={() => setUsuarioAEliminar(u)}
                      />

                  )}
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        {/* Selector de límite */}
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="font-medium text-gray-700">
            Mostrar:
          </label>
          <select
            id="limit"
            value={filtros.limit}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                limit: Number(e.target.value),
                page: 1,
              })
            }
            className="border px-2 py-1 rounded-lg shadow-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={35}>35</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Navegación */}
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={filtros.page === 1}
            onClick={() => cambiarPagina(filtros.page - 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span>
            Página {filtros.page} de {Math.ceil(total / filtros.limit)}
          </span>
          <button
            disabled={filtros.page >= Math.ceil(total / filtros.limit)}
            onClick={() => cambiarPagina(filtros.page + 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>

        <span className="font-semibold">Total: {total}</span>
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        visible={!!usuarioAEliminar}
        title="¿Eliminar Usuario?"
        message={`¿Estás seguro de que quieres eliminar "${usuarioAEliminar?.nombre}"?`}
        onCancel={() => setUsuarioAEliminar(null)}
        onConfirm={confirmarEliminacion}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
