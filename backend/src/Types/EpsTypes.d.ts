import { RowDataPacket } from "mysql2";

export interface Eps{
    id: number
    nombre: string
}
export type NuevaEps = Omit<Eps, 'id'>


export interface EpsSql extends Eps, RowDataPacket{}

interface EpsTotalResult extends RowDataPacket {
  total: number;
}

export interface EpsFiltrados {
  page: number;
  limit: number;
  nombre?: string | undefined;
}


export type FiltrosEpsSql = Omit<EpsFiltrados, "page" | "limit">