import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PacientesService } from "../../services/PacientesService";
import type { Paciente } from "../../types/PacientesTypes";

export default function UnicoPaciente() {
  const { identificacion } = useParams(); // 👈 obtiene el número desde la URL
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      if (!identificacion) return;
      const respuesta = await PacientesService.buscarPorIdentificacion(Number(identificacion));
      setPaciente(respuesta.data);
    };
    fetchPaciente();
  }, [identificacion]);

  if (!paciente) return <p>Cargando...</p>;

  console.log(paciente)
  console.log(paciente.vivienda)
  console.log(paciente.cultura_recreacion)
  return (
<div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200">
  {/* Encabezado */}
  <div className="text-center mb-10">
    <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 rounded-full shadow-lg">
      <i className="fas fa-user text-3xl"></i>
    </div>
    <h1 className="text-4xl font-bold text-gray-800 mt-4">
      Información del Paciente
    </h1>
    <p className="text-gray-500 text-sm mt-1">
      Detalle completo de la información registrada
    </p>
  </div>

  {/* Tarjeta general */}
  <div className="space-y-8">
    {/* Datos personales */}
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
        <i className="fas fa-id-card text-blue-500"></i>
        Datos personales
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-start ml-2">
        <p><span className="font-semibold">Nombres y Apellidos:</span> {paciente.nombres_apellidos}</p>
        <p><span className="font-semibold">Identificación:</span> {paciente.identificacion}</p>
        <p><span className="font-semibold">Edad:</span> {paciente.edad}</p>
        <p><span className="font-semibold">Sexo:</span> {paciente.sexo_nombre}</p>
        <p><span className="font-semibold">Teléfono:</span> {paciente.telefono}</p>
        <p><span className="font-semibold">Dirección:</span> {paciente.direccion}</p>
        <p><span className="font-semibold">Barrio:</span> {paciente.barrio_nombre}</p>
        <p><span className="font-semibold">Vereda:</span> {paciente.vereda_nombre}</p>
        <p><span className="font-semibold">Zona:</span> {paciente.zona_nombre}</p>
      </div>
    </section>

    {/* Información de salud */}
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition ">
      <h2 className="text-2xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
        <i className="fas fa-heartbeat text-green-500"></i>
        Fechas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-start ml-2">
        <p><span className="font-semibold">Fecha de Nacimiento: </span>
        {new Date(paciente.fecha_nacimiento).toLocaleDateString("es-CO")}</p>
        <p><span className="font-semibold">Fecha de Seguimiento: </span>
         {new Date(paciente.fecha_seguimiento).toLocaleDateString("es-CO")}</p>
        <p><span className="font-semibold">Fecha de Visita: </span> 
        {new Date(paciente.fecha_visita).toLocaleDateString("es-CO")}</p>
        
      </div>
    </section>
    {/* Información de salud */}
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition ">
      <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center gap-2">
        <i className="fas fa-heartbeat text-green-500"></i>
        Información de salud
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-start ml-2">
        <p><span className="font-semibold">Estado de vida:</span> {paciente.estado_vida_nombre}</p>
        <p><span className="font-semibold">EPS:</span> {paciente.eps_nombre}</p>
        <p><span className="font-semibold">Discapacidad:</span> {paciente.tipo_discapacidad_nombre}</p>
        <p><span className="font-semibold">Diagnóstico:</span> {paciente.diagnostico_discapacidad}</p>
        <p><span className="font-semibold">Víctima:</span> {paciente.victima_nombre}</p>
        <p><span className="font-semibold">Grupo étnico:</span> {paciente.grupo_etnico_nombre}</p>
        <p><span className="font-semibold">Ciclo de Vida:</span> {paciente.ciclo_vida_nombre}</p>
      </div>
    </section>

    {/* Situación educativa y laboral */}
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
        <i className="fas fa-graduation-cap text-indigo-500"></i>
        Situación educativa y laboral
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-start ml-2">
        <p><span className="font-semibold">Trabaja:</span> {paciente.trabaja ? "Sí" : "No"}</p>
        <p><span className="font-semibold">Estudia:</span> {paciente.estudia ? "Sí" : "No"}</p>
        <p><span className="font-semibold">Grado de estudio:</span> {paciente.grado_estudio_nombre}</p>
      </div>
    </section>

    {/* Otros datos */}
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h2 className="text-2xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
        <i className="fas fa-info-circle text-yellow-500"></i>
        Otros datos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-start ml-2">
        <p><span className="font-semibold">Cuidador:</span> {paciente.cuidador}</p>
        <p><span className="font-semibold">Sustento propio:</span> {paciente.sustento ? "Sí" : "No"}</p>
        <p><span className="font-semibold">Cultura/Recreación:</span> {paciente.cultura_recreacion ? "Sí" : "No"}</p>
        <p><span className="font-semibold">Dispositivo:</span> {paciente.dispositivo}</p>
        <p><span className="font-semibold">Vivienda:</span> {paciente.vivienda ? "Sí" : "No"}</p>
      </div>

      {paciente.observaciones && (
        <div className="mt-5 bg-gray-100 p-4 rounded-lg border-l-4 border-yellow-400 text-start ml-2">
          <p className="font-semibold text-gray-700">Observaciones:</p>
          <p className="text-gray-600 mt-1">{paciente.observaciones}</p>
        </div>
      )}
    </section>
  </div>
</div>

  );
}
