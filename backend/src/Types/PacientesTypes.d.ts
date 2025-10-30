import { RowDataPacket } from "mysql2";

export interface Paciente {
  id: number;
  estado_vida_id: number;
  fecha_seguimiento: string;
  fecha_visita: string;
  identificacion: number;
  nombres_apellidos: string;
  fecha_nacimiento: string;
  trabaja: boolean;
  estudia: boolean;
  sexo_id: number;
  telefono: string;
  direccion: string;
  zona_id: number;
  barrio_id: number;
  vereda_id: number;
  cuidador: string;
  sustento: boolean;
  eps_id: number;
  tipo_discapacidad_id: number;
  diagnostico_discapacidad: string;
  grupo_etnico_id: number;
  victima_id: number;
  victima:boolean
  vivienda: boolean;
  grado_estudio_id: number;
  cultura_recreacion: boolean;
  dispositivo: string;
  observaciones: string;
  edad?: number;
  ciclo_vida_nombre?: string;
  zona_nombre?: string
  barrio_nombre?:string
  vereda_nombre?:string
  eps_nombre?:string
  victima_nombre?:string
  tipo_discapacidad_nombre?:string
  grupo_etnico_nombre?:string
  estado_vida_nombre?:string
  grado_estudio_nombre?:string
  sexo_nombre?:string
}
export type NuevoPaciente = Omit<Paciente, "id" |"edad" | "ciclo_vida_nombre" | "grupo_etnico_nombre" |"tipo_discapacidad_nombre"| "victima_nombre" |"eps_nombre" |"vereda_nombre" |"barrio_nombre" |"zona_nombre"|"estado_vida_nombre"|"grado_estudio_nombre" |"sexo_nombre">;

export interface PacienteSql extends paciente, RowDataPacket{}

export type  PacientesFiltrados = {
    page: number
    limit: number
    nombres_apellidos?: string | undefined
    eps_id?: number | undefined
    zona_id?: number | undefined
    estado_vida_id?: number | undefined
    tipo_discapacidad_id?: number | undefined
    victima?: boolean | undefined
}

export type FiltrosPacienteSQL = Omit<PacientesFiltrados, "page" | "limit">;


interface PacienteTotalResult extends RowDataPacket {
  total: number;
}
