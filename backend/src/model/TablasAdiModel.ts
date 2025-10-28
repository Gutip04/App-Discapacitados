// Tablas adicinale solo ruta get

import { db } from "../database/database.js";
import { Tablas } from "../Types/TablasTypes.js";

export class TablasModel{

    // obtener tipo de discapacidad
    static async tipoDiscapacidad(): Promise<Tablas[]>{
    const [rows] = await db.query(`
        SELECT * From tipo_discapacidad`)
    return rows as Tablas[]
    }

    // obtener grupo etnico
    static async grupoEtnico(): Promise<Tablas[]>{
    const [rows] = await db.query(`
        SELECT * From grupo_etnico`)
    return rows as Tablas[]
    }

    // obtener victima
    static async victima(): Promise<Tablas[]>{
    const [rows] = await db.query(`
        SELECT * From victima`)
    return rows as Tablas[]
    }

    // obtener grado estudio
    static async gradoEstudio(): Promise<Tablas[]>{
    const [rows] = await db.query(`
        SELECT * From grado_estudio`)
    return rows as Tablas[]
    }



}