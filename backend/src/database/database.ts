import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASS,
  DB_NAME
} = process.env;

if (
  DB_HOST === undefined ||
  DB_USER === undefined ||
  DB_PORT === undefined ||
  DB_NAME === undefined
) {
  throw new Error('Faltan variables de entorno para la conexión a la base de datos');
}


export const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  port: parseInt(process.env.DB_PORT!, 10),
  password: DB_PASS ?? '',
  database: DB_NAME,
  multipleStatements: true  

});
