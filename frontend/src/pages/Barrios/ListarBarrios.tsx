import { useState } from "react";
import { useBarrios } from "../../hooks/UseBarrios";
import type { Barrio } from "../../types/BarriosTypes";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { useAuth } from "../../hooks/UseAuth";

export default function ListarBarrios() {
    const {
        barrios, 
        total, 
        loading, 
        error, 
        filtros, 
        eliminarBarrio,
        setFiltros
    } = useBarrios({ nombre: "", page: 1, limit: 5  });
    
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");
    const [barrioAEliminar, setBarrioAEliminar] = useState<Barrio | null>(null);
    const {usuario} = useAuth() 

    // Cambiar pagina
    const cambiarPagina = (nuevaPagina: number) => {
    setFiltros({ ...filtros, page: nuevaPagina });
    };

    // Cambiar busqueda
    const cambiarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, nombre: e.target.value, page: 1 });
    };

    // Confirmar eliminacion
    const confirmarEliminacion = async () => {
        // Verifica que no sea null
        if (!barrioAEliminar) return;

    try {
        await eliminarBarrio(barrioAEliminar.id);
        setMensaje(`Barrio ${barrioAEliminar.nombre} eliminado correctamente.`);
        setTipoMensaje("success");
    } catch {
        setMensaje(`No se pudo eliminar el barrio "${barrioAEliminar.nombre}".`);
        setTipoMensaje("error");
    } finally {
        setBarrioAEliminar(null);
        setTimeout(() => {
            setMensaje("");
            setTipoMensaje("");
        }, 5000);
    }
    };

    return (
    <div className="p-6 max-w-3xl mx-auto">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
    <h1 className="text-3xl font-extrabold uppercase text-gray-800">Barrios</h1>

    <BotonFormulario to="/veredas/crear" texto="Agregar" color="green" px={4} py={2} />
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

  {loading && <p className="text-gray-500">Cargando Barrios...</p>}
  {error && <p className="text-red-500">{error}</p>}

  {/* Tabla */}
  <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
          <th className="py-3 px-4">#</th>
          <th className="py-3 px-4">Nombre</th>
          <th className="py-3 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {barrios.map((b, index) => (
          <tr
            key={b.id}
            className="border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="py-3 px-4">{index + 1}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{b.nombre}</td>
            <td className="py-3 px-4 text-center flex justify-center gap-2">
              <BotonFormulario
                to={`/barrios/editar/${b.id}`}
                texto="Editar"
                color="blue"
                py={2}
                px={4}
              />
              {usuario?.rol !== "usuario" && (
                <BotonFormulario
                  texto="Eliminar"
                  color="red"
                  py={2}
                  px={4}
                  onClick={() => setBarrioAEliminar(b)}
                />
              )}
            </td>
          </tr>
        ))}

        {barrios.length === 0 && !loading && (
          <tr>
            <td colSpan={3} className="text-center text-gray-500 py-6">
              No hay barrios registradas.
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
          limit: Number(e.target.value), // convierte el string a número
          page: 1, // vuelve a la primera página al cambiar el límite
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

  {/* Botones de navegación */}
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
    visible={!!barrioAEliminar}
    title="¿Eliminar barrio?"
    message={`¿Estás seguro de que quieres eliminar "${barrioAEliminar?.nombre}"?`}
    onCancel={() => setBarrioAEliminar(null)}
    onConfirm={confirmarEliminacion}
    confirmText="Eliminar"
    cancelText="Cancelar"
  />
</div>

    
    );
    }
