import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UsuarioToken } from "../Types/UsuariosTypes.d.ts";

// Clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_super_hiper_secreta";

// Extender la interfaz Request para incluir el usuario decodificado
declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioToken;
    }
  }
}


export class authMiddleware{

    // Proteger ruta verificando token
static ProtegerRuta(req: Request, res: Response, next: NextFunction){
  // Buscar el token en cookies
  const token = req.cookies?.token;

  //  Si no hay cookie, intentar leer el header Authorization (compatibilidad)
  const headerToken = req.headers.authorization?.split(" ")[1];
  const finalToken = token || headerToken;

  if (!finalToken) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(finalToken, JWT_SECRET) as UsuarioToken;
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

    // Middleware para rol de Admin
static soloAdmin(req: Request, res: Response, next: NextFunction){
  if (req.usuario?.rol !== "admin") {
    return res.status(403).json({ error: "Acceso restringido a Administradores" });
  }
  next();
};

    // Middleware para rol de SuperAdmin
static soloSuperAdmin(req: Request, res: Response, next: NextFunction){
  if (req.usuario?.rol !== "superAdmin") {
    return res.status(403).json({ error: "Acceso restringido solo al Super Administrador" });
  }
  next();
};

    // Middleware para rol de SuperAdmin y Admin
static adminOSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.usuario?.rol !== "admin" && req.usuario?.rol !== "superAdmin") {
    return res.status(403).json({ error: "Acceso restringido a Administradores o SuperAdministradores" });
  }
  next();
}


}
