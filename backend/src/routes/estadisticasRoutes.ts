import express from "express";
import { EstadisticaController } from "../controller/EstadisticasController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//  proteger todas las rutas
router.use(authMiddleware.ProtegerRuta);

// rutas estadísticas
router.get("/sexo",  EstadisticaController.PorSexo);
router.get("/zona",  EstadisticaController.PorZona);
router.get("/zona-sexo",  EstadisticaController.PorZonaYSexo);
router.get("/estado-vida",  EstadisticaController.PorEstadoVida);
router.get("/estado-vida-sexo", EstadisticaController.PorEstadoVidaYSexo);
router.get("/discapacidad", EstadisticaController.PorDiscapacidad);
router.get("/discapacidad-sexo", EstadisticaController.PorDiscapacidadYSexo);
router.get("/victima-sexo",  EstadisticaController.PorVictimaYSexo);
router.get("/victima",  EstadisticaController.PorVictima);
router.get("/victima-si-no",  EstadisticaController.PorVictimaSiNo);
router.get("/grado-estudio", EstadisticaController.PorGradoEstudio);
router.get("/grado-estudio-sexo", EstadisticaController.PorGradoEstudioYSexo);
router.get("/eps", EstadisticaController.pacientesPorEps);
router.get("/grupoetnico", EstadisticaController.PorGrupoEtnico);
router.get("/ciclodevida", EstadisticaController.PorCicloVida);

router.get("/general",  EstadisticaController.estadisticaGeneral);

// Solo el superAdmin podría acceder a rutas más sensibles (si se agregan después)
// router.get("/completa", SuperAdmin, EstadisticaController.estadisticaGeneral);

export default router;