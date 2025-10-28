import api from "../config/axios";

// Conexion a las rutas de la API
export const EpsService = {
    obtenerTodos: () => api.get("/eps"),
    crear: (data: {nombre: string}) => api.post("/eps", data),
    editar: (id: number, data: { nombre:string }) => api.put(`/eps/${id}`, data),
    eliminar: (id:number) => api.delete(`/eps/${id}`),
    obtenerUno: (id: number) => api.get(`/eps/${id}`),
    buscarPorNombre: (nombre: string) => api.get(`/nombre/${nombre}`),
    filtrar: (params: { nombre?: string; page: number; limit: number }) => api.get("eps/filtrados", {params})

}  
