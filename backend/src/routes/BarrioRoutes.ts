import express from 'express'; 
import { BarrioController } from '../controller/BarrioController.js'; 
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.ProtegerRuta) // proteger todas las rutas a continuación

 
router.get('/filtrados', BarrioController.mostrarFiltrados); // filtra barrios por filtros 

router.get('/', BarrioController.listar); // Listar todos los barrios 
router.get('/:id', BarrioController.obtenerId); // Obtener un barrio por id 
router.post('/', BarrioController.crear); // Crear un barrio 
router.put('/:id', BarrioController.editar); // Editar un barrio 
router.delete('/:id',authMiddleware.adminOSuperAdmin, BarrioController.eliminar); // Eliminar un barrio 

export default router;


