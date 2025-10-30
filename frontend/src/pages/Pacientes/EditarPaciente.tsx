import { useState, useEffect } from "react";
import type { NuevoPaciente, PacienteEditar } from "../../types/PacientesTypes";
import { PacientesService } from "../../services/PacientesService";
import { useBarrios } from "../../hooks/UseBarrios";
import { UseVeredas } from "../../hooks/UseVeredas";
import { UseEps } from "../../hooks/UseEps";
import { useTabla } from "../../hooks/UseTabla";
import { TablaService } from "../../services/TablasService";
import { SelectBuscador } from "../../components/ui/SelectBuscador";
import { useParams } from "react-router-dom";
import BotonFormulario from "../../components/ui/BottonFormulario";

interface Tabla {
  id: number;
  nombre: string;
}



export default function EditarPaciente() {
    
  const {identificacion} = useParams<{identificacion: string}>();   
  
    
  const [paciente, setPaciente] = useState<Partial<PacienteEditar>>({});
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");

  // Datos auxiliares
  const { barrios, loading: loadingBarrios, error: errorBarrios } = useBarrios({ nombre: "", page: 1, limit: 100 });
  const { veredas, loading: loadingVeredas, error: errorVeredas } = UseVeredas({ nombre: "", page: 1, limit: 100 });
  const { eps, loading: loadingEps, error: errorEps } = UseEps({ nombre: "", page: 1, limit: 100 });
  const { data: discapacidades, loading: loadingDiscapacidades, error: errorDiscapacidades } = useTabla<Tabla>(TablaService.TodosDiscapacidad);
  const { data: etnico, loading: loadingEtnico, error: errorEtnico } = useTabla<Tabla>(TablaService.TodosGrupoEtnico);
//   const { data: victima, loading: loadingVictima, error: errorVictima } = useTabla<Tabla>(TablaService.Todosvictimas);
  const { data: estudio, loading: loadingEstudio, error: errorEstudio } = useTabla<Tabla>(TablaService.TodosgradoEstudio);

  // Cargar paciente al iniciar
  useEffect(() => {
    if(!identificacion) return;
    const pacienteId = Number(identificacion);
    if (isNaN(pacienteId)) return; // por seguridad

    PacientesService.buscarPorIdentificacion(pacienteId)
      .then((res) => setPaciente(res.data))
      .catch((err) => {
        console.error("Error al cargar paciente:", err);
        setMensaje("Error al cargar paciente");
        setTipoMensaje("error");
      });
  }, [identificacion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "select-one"
        ? Number(value)
        : type === "number"
        ? Number(value)
        : value;

    setPaciente({ ...paciente, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paciente) return;
    const id = paciente.id;
    if (isNaN(id!)) return; 

    const datos: NuevoPaciente = {
      estado_vida_id: paciente.estado_vida_id ?? 1,
      fecha_seguimiento: paciente.fecha_seguimiento || "2025-10-17",
      fecha_visita: paciente.fecha_visita || "2025-10-17",
      identificacion: Number(paciente.identificacion) || 0,
      nombres_apellidos: paciente.nombres_apellidos || "",
      fecha_nacimiento: paciente.fecha_nacimiento || "2000-01-01",
      trabaja: !!paciente.trabaja,
      estudia: !!paciente.estudia,
      sexo_id: paciente.sexo_id ?? 1,
      telefono: paciente.telefono || "0000000000",
      direccion: paciente.direccion || "Sin dirección",
      zona_id: paciente.zona_id ?? 1,
      barrio_id: paciente.barrio_id ?? 1,
      vereda_id: paciente.vereda_id ?? 1,
      cuidador: paciente.cuidador || "No especificado",
      sustento: !!paciente.sustento,
      eps_id: paciente.eps_id ?? 1,
      tipo_discapacidad_id: paciente.tipo_discapacidad_id ?? 1,
      diagnostico_discapacidad: paciente.diagnostico_discapacidad || "No aplica",
      grupo_etnico_id: paciente.grupo_etnico_id ?? 1,
      victima_id: paciente.victima_id ?? 1,
      victima: !!paciente.victima,
      vivienda: !!paciente.vivienda,
      grado_estudio_id: paciente.grado_estudio_id ?? 1,
      cultura_recreacion: !!paciente.cultura_recreacion,
      dispositivo: paciente.dispositivo || "No aplica",
      observaciones: paciente.observaciones || "Sin observaciones",
    };

    // console.log("Datos a enviar:", datos);

    // editar fecha antes de enviar
    const pacienteAEnviar = {
        ...datos,
        fecha_seguimiento: new Date(datos.fecha_seguimiento).toISOString().split("T")[0],
        fecha_visita: new Date(datos.fecha_visita).toISOString().split("T")[0],
        fecha_nacimiento: new Date(datos.fecha_nacimiento).toISOString().split("T")[0],
    }
    console.log("Datos a enviar después de formatear fechas:", pacienteAEnviar);
    PacientesService.editar(id!, pacienteAEnviar)
      .then(() => {
        setMensaje("✅ Paciente editado correctamente");
        setTipoMensaje("success");
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      })
      .catch((err) => {
        console.error("❌ Error al editar paciente:", err);
        if (err.response?.status === 409) {
        // 💡 Conflicto por identificación duplicada
        setMensaje(`⚠️ ${err.response.data.message || "Ya existe un paciente con esa identificación."}`);
        } else if (err.response?.status === 400) {
        // 💡 Datos inválidos (por el schema de validación)
        setMensaje("❌ Los datos ingresados no son válidos. Revisa los campos.");
        } else {
        // 💡 Cualquier otro error
        setMensaje("❌ Error inesperado al editar paciente.");
        }
      })
        .finally(()=>{
            setTimeout(() => {
            setMensaje("");
            setTipoMensaje("");
            }, 5000);
      });
  };



const manejarCambioZona = (zonaSeleccionada: number) => {
    setPaciente((prev) => {
    const actualizado: Partial<NuevoPaciente> = {
        ...prev,
        zona_id: zonaSeleccionada,
    };

    if (zonaSeleccionada === 1) {
        actualizado.vereda_id = undefined;
    } else if (zonaSeleccionada === 2) {
        actualizado.barrio_id = undefined;
    } else {
        actualizado.barrio_id = undefined;
        actualizado.vereda_id = undefined;
}

    return actualizado;
});
};


  return (
<form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-6">
  <h2 className="text-3xl font-bold text-center mb-6">Editar Paciente</h2>

  {/* ===== Datos Personales ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <h3 className="text-xl font-semibold mb-4">Datos Personales</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="block">
        Nombres y Apellidos
        <input
          type="text"
          name="nombres_apellidos"
          placeholder="Nombres y Apellidos"
          value={paciente.nombres_apellidos || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block">
        Identificación
        <input
          type="number"
          name="identificacion"
          placeholder="Identificación"
          value={paciente.identificacion || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block">
        Fecha de Nacimiento
        <input
          type="date"
          name="fecha_nacimiento"
          value={paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toISOString().split("T")[0] : ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block">
        Género
        <select
          name="sexo_id"
          value={paciente.sexo_id || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        >
          <option value="">Seleccione género</option>
          <option value={1}>Masculino</option>
          <option value={2}>Femenino</option>
        </select>
      </label>

      <label className="block">
        Teléfono
        <input
          type="tel"
          name="telefono"
          value={paciente.telefono || ""}
          onChange={handleChange}
          minLength={10}
          maxLength={10}
          placeholder="Ej: 3001234567"
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block">
        Dirección
        <input
          type="text"
          name="direccion"
          value={paciente.direccion || ""}
          onChange={handleChange}
          placeholder="Ej: CRA 8 18-106"
          className="border p-2 w-full rounded mt-1"
        />
      </label>
    </div>
  </div>

  {/* ===== Fechas ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <h3 className="text-xl font-semibold mb-4">Fechas Importantes</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="block">
        Fecha de Visita
        <input
          type="date"
          name="fecha_visita"
          value={paciente.fecha_visita ? new Date(paciente.fecha_visita).toISOString().split("T")[0] : ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <label className="block">
        Fecha de Seguimiento
        <input
          type="date"
          name="fecha_seguimiento"
          value={paciente.fecha_seguimiento ? new Date(paciente.fecha_seguimiento).toISOString().split("T")[0] : ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>
    </div>
  </div>

  {/* ===== Datos de Salud ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <h3 className="text-xl font-semibold mb-4">Datos de Salud</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectBuscador
        label="Tipo de Discapacidad"
        options={discapacidades.map((d) => ({ value: d.id, label: d.nombre }))}
        value={paciente.tipo_discapacidad_id}
        onChange={(val) => setPaciente((prev) => ({ ...prev, tipo_discapacidad_id: val }))}
        loading={loadingDiscapacidades}
        error={errorDiscapacidades ?? ""}
      />

      <label className="block">
        Diagnóstico
        <input
          type="text"
          name="diagnostico_discapacidad"
          value={paciente.diagnostico_discapacidad || ""}
          onChange={handleChange}
          placeholder="Diagnóstico"
          className="border p-2 w-full rounded mt-1"
        />
      </label>

      <SelectBuscador
        label="Grupo Étnico"
        options={etnico.map((e) => ({ value: e.id, label: e.nombre }))}
        value={paciente.grupo_etnico_id}
        onChange={(val) => setPaciente((prev) => ({ ...prev, grupo_etnico_id: val }))}
        loading={loadingEtnico}
        error={errorEtnico ?? ""}
      />

      {/* <SelectBuscador
        label="Víctima"
        options={victima.map((v) => ({ value: v.id, label: v.nombre }))}
        value={paciente.victima_id}
        onChange={(val) => setPaciente((prev) => ({ ...prev, victima_id: val }))}
        loading={loadingVictima}
        error={errorVictima ?? ""}
      /> */}

      <label className="block">
        Estado de Vida
        <select
            name="estado_vida_id"
            value={paciente.estado_vida_id ?? ""}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-1"
            required
        >
            <option value="">Seleccione estado</option>
            <option value={1}>Vivo</option>
            <option value={2}>Fallecido</option>
        </select>
        </label>

        <label className="flex items-center gap-2 ">
          <input type="checkbox" name="victima" checked={!!paciente.victima} onChange={handleChange} /> ¿Es Victima?
        </label>
    </div>
  </div>

  {/* ===== Educación / Laboral ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <h3 className="text-xl font-semibold mb-4">Educación y Laboral</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectBuscador
        label="Grado de Estudio"
        options={estudio.map((e) => ({ value: e.id, label: e.nombre }))}
        value={paciente.grado_estudio_id}
        onChange={(val) => setPaciente((prev) => ({ ...prev, grado_estudio_id: val }))}
        loading={loadingEstudio}
        error={errorEstudio ?? ""}
      />

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="trabaja" checked={!!paciente.trabaja} onChange={handleChange} /> Trabaja
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="estudia" checked={!!paciente.estudia} onChange={handleChange} /> Estudia
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="sustento" checked={!!paciente.sustento} onChange={handleChange} /> Sustento
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="vivienda" checked={!!paciente.vivienda} onChange={handleChange} /> Vivienda
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="cultura_recreacion" checked={!!paciente.cultura_recreacion} onChange={handleChange} /> Cultura y recreación
        </label>
      </div>
    </div>
  </div>

  {/* ===== Ubicación y EPS ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <div>
      <h3 className="text-xl font-semibold">Ubicación y EPS</h3>
      <span className="text-gray-400">(Seleccione Una Zona)</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Select Zona */}
        <label className="block">
            Zona
            <select
            name="zona_id"
            value={paciente.zona_id || ""}
            onChange={(e) => manejarCambioZona(Number(e.target.value))}
            className="border p-2 w-full rounded mt-1"
            >
            <option value="">Seleccione zona</option>
            <option value={1}>Urbano</option>
            <option value={2}>Rural</option>
            </select>
        </label>

        {/* Mostrar Barrio solo si la zona es Urbana */}
        {paciente.zona_id === 1 && (
            <SelectBuscador
            label="Barrio"
            options={barrios.map((b) => ({ value: b.id, label: b.nombre }))}
            value={paciente.barrio_id}
            onChange={(val) => setPaciente((prev) => ({ ...prev, barrio_id: val }))}
            loading={loadingBarrios}
            error={errorBarrios ?? ""}
            />
        )}

        {/* Mostrar Vereda solo si la zona es Rural */}
        {paciente.zona_id === 2 && (
            <SelectBuscador
            label="Vereda"
            options={veredas.map((v) => ({ value: v.id, label: v.nombre }))}
            value={paciente.vereda_id}
            onChange={(val) => setPaciente((prev) => ({ ...prev, vereda_id: val }))}
            loading={loadingVeredas}
            error={errorVeredas ?? ""}
            />
        )}

        {/* Select EPS (siempre visible) */}
        <SelectBuscador
            label="EPS"
            options={eps.map((e) => ({ value: e.id, label: e.nombre }))}
            value={paciente.eps_id}
            onChange={(val) => setPaciente((prev) => ({ ...prev, eps_id: val }))}
            loading={loadingEps}
            error={errorEps ?? ""}
        />
    </div>
  </div>
  {/* ===== Otros ===== */}
  <div className="p-4 border rounded-md shadow space-y-4 bg-white">
    <h3 className="text-xl font-semibold mb-4">Otros Datos</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="block">
        Cuidador
        <input
          type="text"
          name="cuidador"
          placeholder="Cuidador"
          value={paciente.cuidador || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>
      <label className="block">
        Dispositivo
        <input
          type="text"
          name="dispositivo"
          placeholder="Dispositivo"
          value={paciente.dispositivo || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>
      <label className="block col-span-1 md:col-span-2">
        Observaciones
        <input
          type="text"
          name="observaciones"
          placeholder="Observaciones"
          value={paciente.observaciones || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-1"
        />
      </label>
    </div>
  </div>

    {/* mensaje */}
    {mensaje && (
    <div
      className={`mt-3 p-10 rounded ${
        tipoMensaje === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {mensaje}
    </div>
  )}

  {/* Botón guardar */}
    <BotonFormulario tipo="submit" texto="Guardar Cambios" color="blue" fullWidth={false} py={2} px={4}/>

  
</form>

  );
}
