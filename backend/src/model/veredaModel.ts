import { db } from "../database/database.js";
import type { FiltrosVeredaSQL, Vereda, VeredaSql, VeredaTotalResult, VeredasFiltrados, nuevaVereda } from "../Types/VeredasTypes.js";

export class VeredaModel{

  // obtener veredas
  static async obtener(): Promise<Vereda[]>{
      const [ rows ] = await db.query(`
        SELECT v.id, v.nombre, v.zona_id, z.nombre AS zona_nombre
        FROM vereda v
        JOIN zona z ON v.zona_id = z.id `)
      return rows as Vereda[]
  }
  
  // insertar veredas
  static async insertar(vereda: nuevaVereda): Promise<void>{
    const {nombre, zona_id} = vereda
    await db.query('INSERT IGNORE INTO vereda (nombre, zona_id) VALUES (?, ?)', [nombre, zona_id]);
  };
  
  // buscar vereda
  static async buscar(nombre: string): Promise<Vereda | null>{
    const result = await db.query('SELECT * FROM vereda WHERE nombre = ?', [nombre]);
    const rows = result[0] as Vereda[];
  
    const vereda = rows[0] ?? null; // convierte undefined en null
    return vereda;
  };
  
  // actualizar vereda
  static async actualizar({ id, nombre, zona_id }: Vereda): Promise<void>{
    await db.query('UPDATE vereda SET nombre = ?, zona_id = ? WHERE id = ?', [nombre, zona_id, id]);
  };
  
  // eliminar vereda
  static async eliminar(id: number): Promise<void>{
    await db.query('DELETE FROM vereda WHERE id = ?', [id]);
  };

  // buscarVeredaId
    static async obtenerPorId(id:number): Promise<Vereda | null>{
      const [rows]: any = await db.query(`
        SELECT v.id, v.nombre, v.zona_id, z.nombre AS zona_nombre
        FROM vereda v 
        JOIN zona z ON v.zona_id = z.id
        WHERE v.id = ?
        `, [id])
      return rows[0] || null
    }

  // filtrar veredas
  static async obtenerFiltrados(filtros:VeredasFiltrados):Promise<VeredaSql[]>{
    const {page, limit, ...solofiltros} = filtros
    const offset = (page - 1) * limit

    const {where, valores} = construirCondiciones(solofiltros as FiltrosVeredaSQL)

    const sql = `
    SELECT id, nombre, zona_id FROM vereda
    ${where} ORDER BY nombre ASC LIMIT ? OFFSET ?
    `
    valores.push(limit, offset)

    const [rows] =await db.query<VeredaSql[]>(sql,valores)
    return rows
  }

  // contar veredas
  static async contarFiltrados(filtros:VeredasFiltrados):Promise<number>{
    const { page, limit, ...soloFiltros} = filtros
    const { where, valores} = construirCondiciones(soloFiltros)

    const sql = `SELECT COUNT(*) AS total FROM vereda ${where}`
    const [rows] = await db.query<VeredaTotalResult[]>(sql, valores)
    return rows[0]?.total ?? 0
  }



}

// construir filtros
function construirCondiciones(filtros:FiltrosVeredaSQL){
  const condiciones: string[] = [];
  const valores: any[] = [];

  if (filtros.nombre && filtros.nombre.trim() !== "") {
    condiciones.push("nombre LIKE ?");
    valores.push(`%${filtros.nombre}%`);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";
  return { where, valores}
}
