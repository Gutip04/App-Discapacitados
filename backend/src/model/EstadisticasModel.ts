import { db } from "../database/database.js";

export class EstadisticaModel {

static async pacientesPorSexo() {
    const [rows] = await db.query(`
      SELECT s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY s.nombre
    `);
    return rows;
  }

static async pacientesPorZona() {
    const [rows] = await db.query(`
      SELECT z.nombre AS zona, COUNT(p.id) AS total
      FROM paciente p
      JOIN zona z ON p.zona_id = z.id
      GROUP BY z.nombre
    `);
    return rows;
  }

static async pacientesPorZonaYSexo() {
    const [rows] = await db.query(`
      SELECT z.nombre AS zona, s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN zona z ON p.zona_id = z.id
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY z.nombre, s.nombre
    `);
    return rows;
  }

static async pacientesPorEstadoVida() {
    const [rows] = await db.query(`
      SELECT e.nombre AS estado_vida, COUNT(p.id) AS total
      FROM paciente p
      JOIN estado_vida e ON p.estado_vida_id = e.id
      GROUP BY e.nombre
    `);
    return rows;
  }

static async pacientesPorEstadoVidaYSexo() {
    const [rows] = await db.query(`
      SELECT e.nombre AS estado_vida, s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN estado_vida e ON p.estado_vida_id = e.id
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY e.nombre, s.nombre
    `);
    return rows;
  }

static async pacientesPorDiscapacidad() {
    const [rows] = await db.query(`
        SELECT 
        td.nombre AS tipo_discapacidad, 
        COUNT(p.id) AS total
        FROM paciente p
        JOIN tipo_discapacidad td ON p.tipo_discapacidad_id = td.id
        GROUP BY td.nombre
        ORDER BY total DESC
    `);
    return rows;
    }


static async pacientesPorDiscapacidadYSexo() {
    const [rows] = await db.query(`
      SELECT td.nombre AS tipo_discapacidad, s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN tipo_discapacidad td ON p.tipo_discapacidad_id = td.id
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY td.nombre, s.nombre
    `);
    return rows;
  }

static async pacientesPorVictima() {
    const [rows] = await db.query(`
        SELECT v.nombre AS tipo_victima, COUNT(p.id) AS total
        FROM paciente p
        JOIN victima v ON p.victima_id = v.id
        GROUP BY v.nombre
    `);
    return rows;
    }


static async pacientesPorVictimaYSexo() {
    const [rows] = await db.query(`
      SELECT v.nombre AS tipo_victima, s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN victima v ON p.victima_id = v.id
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY v.nombre, s.nombre
    `);
    return rows;
  }

static async pacientesPorGradoEstudio() {
    const [rows] = await db.query(`
        SELECT g.nombre AS grado_estudio, COUNT(p.id) AS total
        FROM paciente p
        JOIN grado_estudio g ON p.grado_estudio_id = g.id
        GROUP BY g.nombre
    `);
    return rows;
}

static async pacientesPorGradoEstudioYSexo() {
    const [rows] = await db.query(`
      SELECT g.nombre AS grado_estudio, s.nombre AS sexo, COUNT(p.id) AS total
      FROM paciente p
      JOIN grado_estudio g ON p.grado_estudio_id = g.id
      JOIN sexo s ON p.sexo_id = s.id
      GROUP BY g.nombre, s.nombre
    `);
    return rows;
  }



static async pacientesPorEps() {
    const [rows] = await db.query(`
      SELECT e.nombre AS eps, COUNT(p.id) AS total
      FROM paciente p
      JOIN eps e ON p.eps_id = e.id
      GROUP BY e.nombre
    `);
    return rows;
  }

static async pacientesPorGrupoEtnico() {
  const [rows] = await db.query(`
    SELECT ge.nombre AS grupo_etnico, COUNT(p.id) AS total
    FROM paciente p
    JOIN grupo_etnico ge ON p.grupo_etnico_id = ge.id
    GROUP BY ge.nombre
  `);
  return rows;
}

static async pacientesPorCicloDeVida() {
  const [rows] = await db.query(`
    SELECT ciclo_vida_nombre AS ciclo_vida, COUNT(id) AS total
    FROM vista_paciente_ciclo_vida
    GROUP BY ciclo_vida_nombre
    ORDER BY 
      FIELD(ciclo_vida_nombre, 'Primera infancia', 'Infancia', 'Juventud', 'Adultez', 'Adulto mayor');
  `);
  return rows;
}

}
