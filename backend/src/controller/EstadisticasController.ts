import  type { Request, Response } from "express";

import { EstadisticaModel } from "../model/EstadisticasModel.js";

export class EstadisticaController {

  static async PorSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por sexo" });
    }
  }

  static async PorVictimaSiNo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorVictimaSiNo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por Victima Si/No" });
    }
  }

  static async PorZona(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorZona();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por zona" });
    }
  }

  static async PorZonaYSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorZonaYSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por zona y sexo" });
    }
  }

  static async PorEstadoVida(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorEstadoVida();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por estado de vida" });
    }
  }

  static async PorEstadoVidaYSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorEstadoVidaYSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por estado de vida y sexo" });
    }
  }

  static async PorDiscapacidad(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorDiscapacidad();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por discapacidad" });
    }
  }

  static async PorDiscapacidadYSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorDiscapacidadYSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por discapacidad y sexo" });
    }
  }

  static async PorVictimaYSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorVictimaYSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por tipo de víctima y sexo" });
    }
  }

  static async PorVictima(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorVictima();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por tipo de víctima" });
    }
  }

  static async PorGradoEstudio(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorGradoEstudio();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por grado de estudio" });
    }
  }

  static async PorGradoEstudioYSexo(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorGradoEstudioYSexo();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por grado de estudio y sexo" });
    }
  }

  static async pacientesPorEps(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorEps();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por EPS" });
    }
  }

  static async PorGrupoEtnico(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorGrupoEtnico();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por Grupo Etnico" });
    }
  }


  static async PorCicloVida(_req:Request, res:Response) {
    try {
      const data = await EstadisticaModel.pacientesPorCicloDeVida();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener pacientes por Ciclo de vida" });
    }
  }



  static async estadisticaGeneral(_req:Request, res:Response) {
    try {
      const [
        sexo,
        zona,
        zonaSexo,
        estadoVida,
        estadoVidaSexo,
        discapacidadSexo,
        victimaSexo,
        gradoEstudioSexo,
        eps
      ] = await Promise.all([
        EstadisticaModel.pacientesPorSexo(),
        EstadisticaModel.pacientesPorZona(),
        EstadisticaModel.pacientesPorZonaYSexo(),
        EstadisticaModel.pacientesPorEstadoVida(),
        EstadisticaModel.pacientesPorEstadoVidaYSexo(),
        EstadisticaModel.pacientesPorDiscapacidadYSexo(),
        EstadisticaModel.pacientesPorVictimaYSexo(),
        EstadisticaModel.pacientesPorGradoEstudioYSexo(),
        EstadisticaModel.pacientesPorEps()
      ]);

      res.json({
        sexo,
        zona,
        zonaSexo,
        estadoVida,
        estadoVidaSexo,
        discapacidadSexo,
        victimaSexo,
        gradoEstudioSexo,
        eps
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener estadísticas generales" });
    }
  }
}
