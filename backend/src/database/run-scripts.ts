import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSQLScripts() {
  const scriptFiles = ['modeloBaseDatos.sql','pobladoBaseDatos.sql','vista_paciente_ciclo_vida.sql'];

  for (const file of scriptFiles) {
    const sql = fs.readFileSync(path.join(__dirname, '../../scripts', file), 'utf8');
    try {
      await db.query(sql);
      console.log(` Ejecutado: ${file}`);
    } catch (err: any) {
      console.error(` Error en ${file}:`, err.message);
    }
  }

  await db.end();
  console.log(' Todos los scripts ejecutados.');
}

runSQLScripts();
