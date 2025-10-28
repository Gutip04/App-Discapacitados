import express from "express";
import { PacienteController } from "../controller/PacienteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.ProtegerRuta) 

//Rutas específicas 
router.get('/filtrados', PacienteController.mostrarFiltrados); // mostrar pacientes filtrados

// router.get('/', ProtegerRuta, soloAdmin ,mostrarPacientesConEdadYCiclo);
router.get('/' ,PacienteController.Listar); // Listar todos los pacientes
router.post('/', PacienteController.crear); // Crear un paciente  
router.put('/:id', PacienteController.editar); // Editar un paciente
router.delete('/:id', authMiddleware.adminOSuperAdmin, PacienteController.eliminar); // Eliminar un paciente

// Ruta dinámica al final
router.get('/:identificacion', PacienteController.obtenerId); // Obtener un paciente por identificación

export default router;
