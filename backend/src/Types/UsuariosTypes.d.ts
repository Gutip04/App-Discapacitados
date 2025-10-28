import { RowDataPacket } from "mysql2";

export interface Usuario {
    id: number;
    nombre: string
    email: string
    password: string
    rol: "superAdmin" | "admin" | "usuario" !
    activo: boolean
    creado_en: Date;
}



export interface UsuarioSql extends Usuario, RowDataPacket{}

export interface ActivoResult extends RowDataPacket {
  activo: boolean;
}

export interface UsuarioToken {
    id: number
    email: string
    rol: "admin" |"usuario" | "superAdmin"
}