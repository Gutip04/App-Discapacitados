import express from 'express'; 
import { TablasController } from '../controller/TablasController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(authMiddleware.ProtegerRuta) // proteger todas las rutas a continuación

router.get('/tipoDiscapacidad', TablasController.tipoDiscapacidad); // Listar tipos de discapacidad 
router.get('/grupoEtnico', TablasController.grupoEtnico); // Listar grupos etnicos
router.get('/victimas', TablasController.victima); // Listar victimas
router.get('/gradoEstudio', TablasController.gradoEstudio); // Listar grados de estudio


export default router;
