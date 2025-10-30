import type{ FiltrosPacienteSQL, NuevoPaciente, Paciente, PacienteSql, 
PacienteTotalResult, PacientesFiltrados,   } from "../Types/PacientesTypes.d.ts";
import { db } from "../database/database.js";

export class PacienteModel{

    // Mostrar Pacientes
    static async obtenerTodos(): Promise<Paciente[]>{
      const [rows] = await db.query("SELECT * FROM vista_paciente_ciclo_vida");
      return rows as Paciente[];
    };

    // insertar Paciente
    static async Insertar(paciente: NuevoPaciente): Promise<void>{
      // console.log("Insertando paciente...")
        const campos = Object.keys(paciente)
        const valores = Object.values(paciente)
        const placeholder = campos.map(() => "?").join(", ")
    
        await db.query(
            `INSERT INTO paciente (${campos.join(", ")}) values(${placeholder})`, valores
        )
    }

    // Buscar Paciente por  Identificacion
    static async buscarPorIdentificacion(identificacion: number): Promise<PacienteSql | null>{
      const result = await db.query('SELECT * FROM vista_paciente_ciclo_vida WHERE identificacion = ?', [identificacion]);
      const rows = result[0] as PacienteSql[];
    
      const paciente = rows[0] ?? null; // convierte undefined en null
      return paciente;
    };

    // Actualizar Paciente
    static async actualizar(paciente: Partial<Paciente> & { id: number }): Promise<void>{
      const campos = Object.keys(paciente).filter(key => key !== "id");
      const valores = campos.map(key => paciente[key as keyof Paciente]);
      valores.push(paciente.id);
    
      const setClause = campos.map(c => `${c} = ?`).join(", ");
      await db.query(`UPDATE paciente SET ${setClause} WHERE id = ?`, valores);
    };

    // Eliminar Paciente
    static async eliminar(id: number): Promise<void>{
      await db.query('DELETE FROM paciente WHERE id = ?', [id]);


    
}

      // Fitro para busqueda 
    static async obtenerFiltrados(filtros: PacientesFiltrados): Promise<PacienteSql[]> {
      const { page, limit, ...soloFiltros } = filtros;
      const offset = (page - 1) * limit;

      const { where, valores } = construirCondiciones(soloFiltros as FiltrosPacienteSQL);

      const sql = `SELECT * FROM vista_paciente_ciclo_vida ${where} LIMIT ? OFFSET ?`;
      valores.push(limit, offset);

      const [rows] = await db.query<PacienteSql[]>(sql, valores);
      return rows;
    }

    // contar pacientes filtrados
    static async contarFiltrados(filtros: PacientesFiltrados): Promise<number>{
      const {page, limit , ...solofiltros} = filtros
      const { where, valores} = construirCondiciones(solofiltros)
      
      const sql = `SELECT COUNT(*) as total FROM vista_paciente_ciclo_vida ${where}`
      const [rows] = await db.query<PacienteTotalResult[]>(sql, valores);
      return rows[0]?.total ?? 0
    }


    
    
    

};



// esta funcion permite añadir filtros a las busquedas
function construirCondiciones(filtros: FiltrosPacienteSQL): {where: string; valores: any[]}{
  const condiciones: string[] = []
  const valores: any[] = []

  if(filtros.nombres_apellidos){
    condiciones.push("nombres_apellidos LIKE ?")
    valores.push(`%${filtros.nombres_apellidos}%`)
  }
  if (filtros.eps_id !== undefined) {
    condiciones.push("eps_id = ?");
    valores.push(filtros.eps_id);
  }
  if (filtros.zona_id !== undefined) {
    condiciones.push("zona_id = ?");
    valores.push(filtros.zona_id);
  }
  if (filtros.estado_vida_id !== undefined) {
    condiciones.push("estado_vida_id = ?");
    valores.push(filtros.estado_vida_id);
  }
  if (filtros.tipo_discapacidad_id !== undefined) {
    condiciones.push("tipo_discapacidad_id = ?");
    valores.push(filtros.tipo_discapacidad_id);
  }
  if (filtros.victima !== undefined) {
    condiciones.push("victima = ?");
    valores.push(filtros.victima ? 1 : 0); // Convierte true/false a 1/0
  }
  

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";
  return { where, valores}
} 