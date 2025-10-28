import { db } from "../database/database.js";
import type { Eps, EpsFiltrados, EpsSql, EpsTotalResult, FiltrosEpsSql, NuevaEps } from "../Types/EpsTypes.d.ts";

export class EpsModel{
  // Mostrar eps
  static async obtener(): Promise<Eps[]>{
      const [rows] = await db.query('SELECT * FROM eps')
      return rows as Eps[]
  }

  // Insertar Eps
  static async insertar(eps: NuevaEps ): Promise<void>{
    const {nombre} = eps
    await db.query('INSERT IGNORE INTO eps (nombre) VALUES (?)', [nombre]);
  };

  // buscar eps por nombre
  static async buscar(nombre: string): Promise<Eps | null>{
    const result = await db.query('SELECT * FROM eps WHERE nombre = ?', [nombre]);
    const rows = result[0] as Eps[];
  
    const eps = rows[0] ?? null; // convierte undefined en null
    return eps;
  };
  
  //  actualizar eps
  static async actualizar ({ id, nombre}: Eps): Promise<void>{
    await db.query('UPDATE eps SET nombre = ?  WHERE id = ?', [nombre, id]);
  };

  // Eliminar eps
  static async eliminar(id: number): Promise<void>{
    await db.query('DELETE FROM eps WHERE id = ?', [id]);
  };

    // Obtener EPS por id
  static async obtenerPorId(id: number): Promise<Eps | null> {
    const [rows]: any = await db.query(
      `
      SELECT id, nombre
      FROM eps
      WHERE id = ?
      `,
      [id]
    );
    return rows[0] || null;
  }

  // filtrar eps
  static async obtenerFiltrados(filtros:EpsFiltrados):Promise<EpsSql[]>{
    const {page, limit, ...solofiltros} = filtros
    const offset = (page - 1) * limit

    const {where, valores} = construirCondiciones(solofiltros as FiltrosEpsSql)

    const sql = `
    SELECT id, nombre FROM eps
    ${where} ORDER BY nombre ASC LIMIT ? OFFSET ?
    `
    valores.push(limit, offset)

    const [rows] =await db.query<EpsSql[]>(sql,valores)
    return rows
  }

  // contar eps
  static async contarFiltrados(filtros:EpsFiltrados):Promise<number>{
    const { page, limit, ...soloFiltros} = filtros
    const { where, valores} = construirCondiciones(soloFiltros)

    const sql = `SELECT COUNT(*) AS total FROM eps ${where}`
    const [rows] = await db.query<EpsTotalResult[]>(sql, valores)
    return rows[0]?.total ?? 0
  }


}


// construir filtros
function construirCondiciones(filtros:FiltrosEpsSql){
  const condiciones: string[] = [];
  const valores: any[] = [];

  if (filtros.nombre && filtros.nombre.trim() !== "") {
    condiciones.push("nombre LIKE ?");
    valores.push(`%${filtros.nombre}%`);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";
  return { where, valores}
}




