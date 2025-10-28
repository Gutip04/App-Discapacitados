import api from "../config/axios";
import type { FiltrosPaciente, NuevoPaciente } from "../types/PacientesTypes";

// Conexion a las rutas de la API
export const PacientesService = {
    obtenerTodos: () => api.get("/pacientes"),
    crear: (data:NuevoPaciente) => api.post("/pacientes", data),
    editar: (id: number, data:NuevoPaciente ) => api.put(`/pacientes/${id}`, data as NuevoPaciente),
    eliminar: (id:number) => api.delete(`/pacientes/${id}`),
    // obtenerUno: (id: number) => api.get(`/pacientes/${id}`),
    buscarPorIdentificacion: (identificacion: number) => api.get(`/pacientes/${identificacion}`),
    filtrar: (params:FiltrosPaciente) => api.get("/pacientes/filtrados", {params})

}