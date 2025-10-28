import  express  from "express";
import { EpsController} from "../controller/EpsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router  = express.Router()

router.use(authMiddleware.ProtegerRuta) // proteger todas las rutas a continuación

router.get('/filtrados', EpsController.EpsFiltrados) // mostrar eps filtradas

router.get('/', EpsController.listar); // Listar todas las eps
router.get('/:id', EpsController.obtenerId); // Obtener una eps por id
router.post('/', EpsController.crear); // Crear una eps 
router.put('/:id', EpsController.editar); // Editar una eps
router.delete('/:id', authMiddleware.adminOSuperAdmin, EpsController.eliminar); // Eliminar un eps



export default router