import bcrypt from "bcrypt"
import { db } from "../database/database.js"
import type{ ActivoResult, Usuario, UsuarioSql } from "../Types/UsuariosTypes.d.ts"

export class UsuarioModel {

      // obtener Usuarios
    static async obtener(): Promise<Usuario[]>{
          const [rows] = await db.query(`
            SELECT * FROM usuarios
            
          `);
          return rows as Usuario[]
        }
        
    
    static async crear(nombre: string, email:string, password:string, rol: "admin" | "usuario" = "usuario"): Promise<void>{
        const hashed = await bcrypt.hash(password,10)
        await db.query(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
            [nombre, email, hashed, rol]
        )
    }

    static async buscarEmail(email:string): Promise<Usuario | null>{
        const [rows] = await db.query<UsuarioSql[]>(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        )
        return rows[0] ?? null
    }

    static async estaActivo(email:string): Promise<boolean>{
        const [rows] = await db.query<ActivoResult[]>(
            "SELECT activo FROM usuarios WHERE email = ?",
            [email]
        )
        return rows[0]?.activo ?? false
    }

    static async actualizar(id:number, nombre:string, email:string, rol: "admin" | "usuario", activo:boolean): Promise<boolean>{
        const [result] = await db.query(
            "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, activo = ? WHERE id = ?",
            [nombre, email, rol, activo, id]
        )

    // @ts-ignore porque el tipo devuelto por db.query puede variar
    return result.affectedRows > 0
    }

    static async cambiarPassword(id: number, nuevaPassword: string): Promise<boolean> {
    const hashed = await bcrypt.hash(nuevaPassword, 10);

        const [result] = await db.query(
            "UPDATE usuarios SET password = ? WHERE id = ?",
            [hashed, id]
        );

    // @ts-ignore: el tipo de resultado depende del driver
    return result.affectedRows > 0;
}


    static async eliminar(id:number):Promise<boolean> {
    const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    // @ts-ignore: el tipo de resultado depende del driver
    return result.affectedRows > 0;
}

  static async buscarPorId(id: number): Promise<Usuario | null> {
    const [rows]: any = await db.query(
      `SELECT id, nombre, email, rol, activo 
       FROM usuarios 
       WHERE id = ?`,
      [id]
    );

    return rows.length ? rows[0] : null;
  }


}