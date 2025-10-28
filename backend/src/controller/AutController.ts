import type{ Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UsuarioModel } from "../model/UsuarioModel.js";

// Secret key para JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_super_hiper_secrete"

    // Aut Controller
export class AutController {

    // Login Usuario
static async login(req:Request, res:Response){
    try {
        const { email, password} = req.body

        const usuario = await UsuarioModel.buscarEmail(email)
        if(!usuario){
            return res.status(401).json({ error: "Correo incorrecto"})
        }

        if(!usuario.activo){
            return res.status(403).json({error: "Usuario Inactivo"})
        }

        const valido = await bcrypt.compare(password, usuario.password)
        if(!valido){
            return res.status(401).json({ error: "Contraseña incorrecta"})
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: "1h" } // ✅ nombre correcto: expiresIn
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Cambiar a true si usas HTTPS
            sameSite: "lax",
            maxAge: 60*60*1000 // 1 hora
        })

        res.json({ mensage: "Login exitoso" });
    } catch (error){
        console.error("Error en login:", error)
        res.status(500).json({ error: "Error interno del servidor"})
    }
}

    // Logout Usuario 
static async logout(_req: Request, res: Response){
  res.clearCookie("token", { sameSite: "lax", secure: false });
  res.json({ mensaje: "Sesión cerrada correctamente" });
};


    // Verificar sesión
static async verificarSesion(req: Request, res: Response){
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No autenticado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ usuario: decoded });
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};



}


    // Usuario Controller
export class UsuarioController {
    
    // Listar Usuarios
static async listar(_req:Request, res: Response){
    try{
        const eps = await UsuarioModel.obtener()
        res.json(eps)
    } catch (err){
        res.status(500).json({ error: 'Los Usuarios no se pueden obtener' })
    } 
}

    // Registrar Usuario
static async register(req: Request, res: Response){
    try{
        const {nombre, email, password, rol} = req.body

        const existente = await UsuarioModel.buscarEmail(email)
        if(existente){
            return res.status(400).json({ error: "Correo ya registrado"})
        }

        await UsuarioModel.crear(nombre, email, password, rol)
        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch(error) {
        console.log("Error en registro: ", error);
        res.status(500).json({ error: "Error interno del servidor"})
        
    }
}

    // Editar Usuario 
static async editar(req: Request, res: Response){
    try{
        const { id } = req.params
        const { nombre, email, rol, activo } = req.body

        if(!nombre || !email || !rol || activo === undefined){
            return res.status(400).json({ error: "Faltan datos obligatorios"})
        }

        const existente = await UsuarioModel.buscarEmail(email)

        const { password, ...Usuario } = existente || {};
        if(existente && existente.id != Number(id)){
            return res.status(409).json({ 
                mensage: "Ya existe otro usuario con ese correo",
                usuario: { Usuario}
            })
        }

        const actualizado = await UsuarioModel.actualizar(
            Number(id), 
            nombre, 
            email, 
            rol, 
            activo ?? 1
    )
        if(!actualizado){
            return res.status(404).json({ error: "Usuario no encontrado"})
        }
        res.json({ mensaje: "Usuario actualizado correctamente",
        usuario: { id: Number(id), nombre, email,  rol, activo } 
        })
    } catch(error){
        console.error("Error al editar usuario:", error)
        res.status(500).json({ error: "Error interno del servidor"})
    }   

}

    // Cambiar contraseña (solo superAdmin)
static async cambiarPassword(req: Request, res: Response){
  try {
    const { id } = req.params;
    const { nuevaPassword } = req.body;

    if (!nuevaPassword || nuevaPassword.length < 5) {
      return res
        .status(400)
        .json({ error: "La nueva contraseña debe tener al menos 5 caracteres" });
    }

    const actualizado = await UsuarioModel.cambiarPassword(Number(id), nuevaPassword);

    if (!actualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


    //  Eliminar usuario 
static async eliminar(req: Request, res: Response){
    try{
        const { id } = req.params

        if(!id) return res.status(400).json({ error: "Falta el ID del Usuario" });
        
        await UsuarioModel.eliminar(Number(id))
        res.json({ message: "Usuario eliminado exitosamente" });
    }catch (error){
        res.status(500).json({ error: "Error al eliminar al Usuario" });

    }

}


    // Obtener usuario por ID
static async obtenerId(req: Request, res: Response){
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const usuario = await UsuarioModel.buscarPorId(Number(id));

      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
}


}















