import api from "../config/axios";

export const VeredaService = {
    obtenerTodos: () => api.get("/veredas"),
    crear: (data: {nombre: string, zona_id: number}) => api.post("/veredas", data),
    editar: (id: number, data: {nombre:string, zona_id:number }) => api.put(`/veredas/${id}`, data),
    eliminar: (id:number) => api.delete(`veredas/${id}`),
    obtenerUno: (id:number) => api.get(`veredas/${id}`),
    buscarPorNombre: (nombre: string) => api.get(`nombre/${nombre}`),
    filtrar: (params: { nombre?: string; page: number; limit: number }) => api.get("veredas/filtrados", {params})

    

}