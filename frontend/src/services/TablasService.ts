import api from "../config/axios";

// Conexion a las rutas de la API
export const TablaService = {
    TodosDiscapacidad: () => api.get("/tablas/tipoDiscapacidad"),
    TodosGrupoEtnico: () => api.get("/tablas/grupoEtnico"),
    Todosvictimas: () => api.get("/tablas/victimas"),
    TodosgradoEstudio: () => api.get("/tablas/gradoEstudio"),
}