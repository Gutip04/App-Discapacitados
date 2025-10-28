import { db } from "../database/database.js";
import type { Barrio, BarriosFiltrados, BarrioSql, BarrioTotalResult, FiltrosBarrioSQL, nuevoBarrio } from "../Types/BarriosTypes.d.ts";

export class BarrioModel{

  // obtener Barrios
  static async obtener(): Promise<Barrio[]>{
      const [rows] = await db.query(`
        SELECT b.id, b.nombre, b.zona_id, z.nombre AS zona_nombre
        FROM barrio b
        JOIN zona z ON b.zona_id = z.id
      `);
      return rows as Barrio[]
    }
    
  // insertar barrios
  static async insertar(barrio: nuevoBarrio ): Promise<void>{
      const {nombre, zona_id} = barrio
      await db.query('INSERT IGNORE INTO barrio (nombre, zona_id) VALUES (?, ?)', [nombre, zona_id]);
    };

  // Buscar barrio
  static async buscar(nombre: string): Promise<Barrio | null>{
      const result = await db.query('SELECT * FROM barrio WHERE nombre = ?', [nombre]);
      const rows = result[0] as Barrio[];
    
      const barrio = rows[0] ?? null; // convierte undefined en null
      return barrio;
    };
  // buscarBarrioId
  static async obtenerPorId(id:number): Promise<Barrio | null>{
    const [rows]: any = await db.query(`
      SELECT b.id, b.nombre, b.zona_id, z.nombre AS zona_nombre
      FROM barrio b 
      JOIN zona z ON b.zona_id = z.id
      WHERE b.id = ?
      `, [id])
    return rows[0] || null
  }
  //  Actualizar barrio
  static async actualizar({ id, nombre, zona_id }: Barrio): Promise<void>{
      await db.query('UPDATE barrio SET nombre = ?, zona_id = ? WHERE id = ?', [nombre, zona_id, id]);
    };
    
  // eliminar barrio  
  static async eliminar(id: number): Promise<void>{
      await db.query('DELETE FROM barrio WHERE id = ?', [id]);
    };

  // filtro de barrios
  static async obtenerFiltrados(filtros: BarriosFiltrados): Promise<BarrioSql[]>{
    const { page, limit, ...soloFiltros} = filtros
    const offset = (page -1) * limit

    const {where, valores } = construirCondiciones(soloFiltros as FiltrosBarrioSQL )

    const sql = `
    SELECT id, nombre, zona_id FROM barrio
    ${where} ORDER BY nombre ASC LIMIT ? OFFSET ? 
    `;
    valores.push(limit, offset)
    
    const [rows] = await db.query<BarrioSql[]>(sql,valores)
    return rows
  }

  // contar barrios filtrados
  static async contarFiltrados(filtros: BarriosFiltrados): Promise<number> {
  const { page, limit, ...soloFiltros } = filtros;
  const { where, valores } = construirCondiciones(soloFiltros);

  const sql = `SELECT COUNT(*) AS total FROM barrio ${where}`;
  const [rows] = await db.query<BarrioTotalResult[]>(sql, valores);
  return rows[0]?.total ?? 0;
}



}

function construirCondiciones(filtros: FiltrosBarrioSQL) {
  const condiciones: string[] = [];
  const valores: any[] = [];

  if (filtros.nombre && filtros.nombre.trim() !== "") {
    condiciones.push("nombre LIKE ?");
    valores.push(`%${filtros.nombre}%`);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";
  return { where, valores}
}




