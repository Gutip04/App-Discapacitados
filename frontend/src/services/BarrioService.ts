import api from "../config/axios";

// Conexion a las rutas de la API
export const BarrioService = {
    obtenerTodos: () => api.get("/barrios"),
    crear: (data: {nombre: string, zona_id:number}) => api.post("/barrios", data),
    editar: (id: number, data: { nombre:string, zona_id:number }) => api.put(`/barrios/${id}`, data),
    eliminar: (id:number) => api.delete(`/barrios/${id}`),
    obtenerUno: (id: number) => api.get(`/barrios/${id}`),
    buscarPorNombre: (nombre: string) => api.get(`/nombre/${nombre}`),
    filtrar: (params: { nombre?: string; page: number; limit: number }) => api.get("barrios/filtrados", {params})

}