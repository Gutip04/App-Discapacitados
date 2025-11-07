import bcrypt from "bcrypt";
import { db } from "../database/database.js";

async function seedSuperAdmin() {
  const nombre = "Super Admin";
  const email = "admin@produccion.com";
  const plainPassword = "admin123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);

    if ((rows as any[]).length > 0) {
      console.log("El usuario superAdmin ya existe.");
      return;
    }

    await db.execute(
      "INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?, ?, ?, 'superAdmin', 1)",
      [nombre, email, hashedPassword]
    );

    console.log(" Usuario superAdmin creado correctamente.");
  } catch (error) {
    console.error(" Error al insertar el usuario:", error);
  }
}

seedSuperAdmin();
