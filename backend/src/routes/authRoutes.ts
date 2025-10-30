import { Router } from "express";
import { AutController,  UsuarioController} from "../controller/AutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

//  login es público
router.post("/login", AutController.login);

// Todas las rutas siguientes requieren autenticación
router.use(authMiddleware.ProtegerRuta);

// Logout y check
router.post("/logout", AutController.logout);
router.get("/check", AutController.verificarSesion);

// A partir de aquí, solo admin o superadmin
router.use(authMiddleware.adminOSuperAdmin); 

router.post("/register", UsuarioController.register);
router.get("/listar", UsuarioController.listar);
router.put("/editar/:id", UsuarioController.editar);
router.get("/ver/:id", UsuarioController.obtenerId);
router.delete("/:id", UsuarioController.eliminar);

// Solo superadmin
router.put("/:id/password", authMiddleware.soloSuperAdmin, UsuarioController.cambiarPassword);


export default router