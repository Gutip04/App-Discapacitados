import express from 'express';
import {  VeredaController } from '../controller/VeredaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.ProtegerRuta) // proteger todas las rutas a continuación

router.get('/filtrados', VeredaController.mostrarFiltrados) // mostrar veredas filtradas

router.get('/', VeredaController.listar); // Listar todas las veredas
router.get('/:id', VeredaController.obtenerId); // Obtener una vereda por id
router.post('/', VeredaController.crear); // Crear una vereda
router.put('/:id', VeredaController.editar); // Editar una vereda
router.delete('/:id',authMiddleware.adminOSuperAdmin, VeredaController.eliminar); // Eliminar una vereda

export default router;