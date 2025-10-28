import { RowDataPacket } from "mysql2";

// src/types.ts
export interface Vereda {
  id: number;
  nombre: string;
  zona_id: number;
  zona_nombre?: string

}

export interface VeredaSql extends Vereda, RowDataPacket{}

interface VeredaTotalResult extends RowDataPacket {
  total: number;
}

export type nuevaVereda = omit<Barrio, 'id'>

export interface VeredasFiltrados {
  page: number;
  limit: number;
  nombre?: string | undefined;
}


export type FiltrosVeredaSQL = Omit<VeredasFiltrados, "page" | "limit">
