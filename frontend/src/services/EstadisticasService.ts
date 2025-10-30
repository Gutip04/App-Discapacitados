import api from "../config/axios";

export const EstadisticasService = {
    General: () => api.get("/estadisticas/general"),
    Sexo: () => api.get("/estadisticas/sexo"),
    Zona: () => api.get("/estadisticas/zona"), 
    EstadoVida: () => api.get("/estadisticas/estado-vida"),
    Discapacidad: () => api.get("estadisticas/discapacidad"),
    Victima: () => api.get("estadisticas/victima"), 
    VictimaSiNo: () => api.get("estadisticas/victima-si-no"), 
    GradoEstudio: () => api.get("estadisticas/grado-estudio"), 
    Eps: () => api.get("estadisticas/eps"),
    GruposEtnicos: () => api.get("estadisticas/grupoetnico"),
    CicloVida: () => api.get("estadisticas/ciclodevida")

}