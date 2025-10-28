import { RowDataPacket } from "mysql2";

// src/types.ts
export interface Barrio {
  id: number;
  nombre: string;
  zona_id: number;
  zona_nombre?: string
}

export interface BarrioSql extends Barrio, RowDataPacket{}

interface BarrioTotalResult extends RowDataPacket {
  total: number;
}


export interface BarriosFiltrados {
  page: number;
  limit: number;
  nombre?: string | undefined;
}

export type FiltrosBarrioSQL = Omit<BarriosFiltrados, "page" | "limit">



export type nuevoBarrio = omit<Barrio, 'id'>
