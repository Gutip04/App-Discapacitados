import { z } from "zod";

export const pacienteSchema = z.object({
  estado_vida_id: z.number().int().positive("El estado de vida debe ser un número positivo"),
  fecha_seguimiento: z.string().date("La fecha de seguimiento debe tener un formato de fecha válido"),
  fecha_visita: z.string().date("La fecha de visita debe tener un formato de fecha válido"),
  identificacion: z.number().int().positive("La identificación debe ser un número positivo"),
  nombres_apellidos: z.string().min(1, "Los nombres y apellidos son obligatorios"),
  fecha_nacimiento: z.string().date("La fecha de nacimiento debe tener un formato de fecha válido"),
  trabaja: z.boolean(),
  estudia: z.boolean(),
  sexo_id: z.number().int().positive("El sexo es obligatorio"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 caracteres"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  zona_id: z.number().int().positive("La zona es obligatoria"),
  barrio_id: z.number().int().positive("El barrio es obligatorio"),
  vereda_id: z.number().int().positive("La vereda es obligatoria"),
  cuidador: z.string().min(1, "El nombre del cuidador es obligatorio"),
  sustento: z.boolean(),
  eps_id: z.number().int().positive("La EPS es obligatoria"),
  tipo_discapacidad_id: z.number().int().positive("El tipo de discapacidad es obligatorio"),
  diagnostico_discapacidad: z.string().min(1, "El diagnóstico de discapacidad es obligatorio"),
  grupo_etnico_id: z.number().int().positive("El grupo étnico es obligatorio"),
  victima_id: z.number().int().positive("El tipo de víctima es obligatorio"),
  victima: z.boolean(),
  vivienda: z.boolean(),
  grado_estudio_id: z.number().int().positive("El grado de estudio es obligatorio"),
  cultura_recreacion: z.boolean(),
  dispositivo: z.string().min(1, "El dispositivo es obligatorio"),
  observaciones: z.string(),
});




export const filtroPacienteSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(200).default(10),
  nombres_apellidos: z.string().optional(),
  zona_id: z.coerce.number().optional(),
  eps_id: z.coerce.number().optional(),
  barrio_id: z.coerce.number().optional(),
  estado_vida_id: z.coerce.number().optional(),
  tipo_discapacidad_id: z.coerce.number().optional(),
  victima: z
  .union([z.string(), z.boolean()])
  .transform(val => val === "true" || val === true)
  .optional(),

});

export function validar<T>(schema: z.ZodSchema<T>, data: unknown): { ok: true; data: T } | { ok: false; errores: z.ZodIssue[] } {
  const result = schema.safeParse(data);
  return result.success
    ? { ok: true, data: result.data }
    : { ok: false, errores: result.error.issues };
}



