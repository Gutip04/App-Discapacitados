import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { usePacientes } from "../../hooks/UsePacientes";
import type { Paciente } from "../../types/PacientesTypes";
import { useNavigate } from "react-router-dom";
import { UseEps } from "../../hooks/UseEps";
import { useTabla, type Discapacidad } from "../../hooks/UseTabla";
import { TablaService } from "../../services/TablasService";
import { useAuth } from "../../hooks/UseAuth";


export default function ListarPacientes(){
    const {
        pacientes, 
        total, 
        loading, 
        error, 
        filtros, 
        eliminarPaciente,
        setFiltros
    } = usePacientes({ nombres_apellidos:"", page: 1, limit: 5  });
    
    // Permite navegar entre paginas 
    const navigate = useNavigate();
    
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");
    const [pacienteAEliminar, setPacienteAEliminar] = useState<Paciente | null>(null);
    const { eps, loading: loadingEps, error: errorEps } = UseEps({ nombre: "", page: 1, limit: 100 });
    const { data: discapacidades, loading: loadingDiscapacidades, error: errorDiscapacidades } = useTabla<Discapacidad>(TablaService.TodosDiscapacidad);
    const { usuario } = useAuth();

    

    // Cambiar pagina
    const cambiarPagina = (nuevaPagina: number) => {
    setFiltros({ ...filtros, page: nuevaPagina });
    };

    // Cambiar busqueda
    const cambiarBusquedaNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, nombres_apellidos: e.target.value, page: 1 });
    };
    // Cambiar busqueda por eps
    const cambiarBusquedaEps = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const valor = e.target.value;
      const numero = valor ? Number(valor) : undefined;
    setFiltros({ ...filtros, eps_id: numero, page: 1 });
    };
    // Cambiar busqueda por zona
    const cambiarBusquedaZona = (e: React.ChangeEvent<HTMLSelectElement>) => {      
      const valor = e.target.value;
      const numero = valor ? Number(valor) : undefined;
    setFiltros({ ...filtros, zona_id: numero, page: 1 });
    };
    // Cambiar busqueda por estado de vida
    const cambiarBusquedaestadoVida = (e: React.ChangeEvent<HTMLSelectElement>) => {      
      const valor = e.target.value;
      const numero = valor ? Number(valor) : undefined;
    setFiltros({ ...filtros, estado_vida_id: numero, page: 1 });
    };
    // Cambiar busqueda por tipo de discapacidad
    const cambiarBusquedaTipoDiscapacidad = (e: React.ChangeEvent<HTMLSelectElement>) => {      
      const valor = e.target.value;
      const numero = valor ? Number(valor) : undefined;
    setFiltros({ ...filtros, tipo_discapacidad_id: numero, page: 1 });
    };



    // Confirmar eliminacion
    const confirmarEliminacion = async () => {
        // Verifica que no sea null
        if (!pacienteAEliminar) return;

    try {
        await eliminarPaciente(pacienteAEliminar.id);
        setMensaje(`paciente ${pacienteAEliminar.nombres_apellidos} eliminado correctamente.`);
        setTipoMensaje("success");
    } catch {
        setMensaje(`No se pudo eliminar el paciente "${pacienteAEliminar.nombres_apellidos}".`);
        setTipoMensaje("error");
    } finally {
        setPacienteAEliminar(null);
        setTimeout(() => {
            setMensaje("");
            setTipoMensaje("");
        }, 5000);
    }
    };

    // console.log(pacientes)
    return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold uppercase text-gray-800">Pacientes</h1>

        <BotonFormulario to="/pacientes/crear" texto="Agregar" color="green" px={4} py={2} />
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
  {/* 🔍 FILTROS */}
<div className="mb-6 flex flex-col sm:flex-row gap-4">
  {/* Filtro por nombre */}
  <input
    type="text"
    value={filtros.nombres_apellidos}
    onChange={cambiarBusquedaNombre}
    placeholder="Buscar por nombre"
    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
  />

  {/* Filtro por Tipo de discapacidad */}
  <select
    value={filtros.tipo_discapacidad_id || ""}
    onChange={cambiarBusquedaTipoDiscapacidad}
    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
  >
    <option value="">Todas las Discapacidades</option>
    {loadingDiscapacidades 
    ? (<option disabled>Cargando...</option>)
    :
    (errorDiscapacidades 
      ? 
      (<option disabled>Error al cargar</option>)
        :
        (discapacidades.map((d) => (
            <option key={d.id} value={d.id}>{d.nombre}</option>
          ))    
        ))}
  </select>
  
  {/* Filtro por eps */}
  <select
    value={filtros.eps_id || ""}
    onChange={cambiarBusquedaEps}
    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
  >
    <option value="">Todas las Eps</option>
    {loadingEps 
    ? (<option disabled>Cargando...</option>)
    :
    (errorEps 
      ? 
      (<option disabled>Error al cargar</option>)
        :
        (eps.map((d) => (
            <option key={d.id} value={d.id}>{d.nombre}</option>
          ))    
        ))}
  </select>
  

  {/* Filtro por Zona */}
  <select
    value={filtros.zona_id || ""}
    onChange={cambiarBusquedaZona}
    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
  >
    <option value="">Todas las zonas</option>
    <option value="1">Urbana</option>
    <option value="2">Rural</option>
    {/* 🟡 También puedes traer las zonas desde la API */}
  </select>
  {/* Filtro por estado de vida */}
  <select
    value={filtros.estado_vida_id || ""}
    onChange={cambiarBusquedaestadoVida}
    className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
  >
    <option value="">Estado de vida</option>
    <option value="1">Vivo</option>
    <option value="2">Fallecido</option>
    {/* 🟡 También puedes traer las zonas desde la API */}
  </select>
</div>

  {loading && <p className="text-gray-500">Cargando Pacientes...</p>}
  {error && <p className="text-red-500">{error}</p>}

  {/* Tabla */}
  <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
          <th className="py-3 px-4">#</th>
          <th className="py-3 px-4">Estado de Vida</th>
          <th className="py-3 px-4">Nombres y Apellidos</th>
          <th className="py-3 px-4">Edad</th>
          <th className="py-3 px-4">Cedula</th>
          {/* <th className="py-3 px-4">Barrio</th>
          <th className="py-3 px-4">Vereda</th> */}
          <th className="py-3 px-4 text-center">Zona</th>
          <th className="py-3 px-4 text-center">Tipo de Discapacidad</th>
          <th className="py-3 px-4 text-center">Sexo</th>
          <th className="py-3 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((p, index) => (
          <tr
            key={p.id}
            className="border-b hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="py-3 px-4">{index + 1}</td>
            <td className="py-3 px-4">{p.estado_vida_nombre}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.nombres_apellidos}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.edad}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.identificacion}</td>
            {/* <td className="py-3 px-4 font-medium text-gray-700">{p.barrio_nombre}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.vereda_nombre}</td> */}
            <td className="py-3 px-4 font-medium text-gray-700">{p.zona_nombre}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.tipo_discapacidad_nombre}</td>
            <td className="py-3 px-4 font-medium text-gray-700">{p.sexo_nombre}</td>
            <td className="py-3 px-4 text-center flex justify-center gap-2">
              <BotonFormulario
                to={`editar/${p.identificacion}`}
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
                  onClick={() => setPacienteAEliminar(p)}
                />
              )}
              <BotonFormulario
                texto="Informacion"
                color="gray"
                py={2}
                px={4}
                onClick={() => navigate(`/pacientes/${p.identificacion}`)}
              />
            </td>
          </tr>
        ))}

        {pacientes.length === 0 && !loading && (
          <tr>
            <td colSpan={3} className="text-center text-gray-500 py-6">
              No hay pacientes registrados.
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
    visible={!!pacienteAEliminar}
    title="¿Eliminar paciente?"
    message={`¿Estás seguro de que quieres eliminar "${pacienteAEliminar?.nombres_apellidos}"?`}
    onCancel={() => setPacienteAEliminar(null)}
    onConfirm={confirmarEliminacion}
    confirmText="Eliminar"
    cancelText="Cancelar"
  />
</div>

    
    );
    }


 