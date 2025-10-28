import { z } from "zod";

export const barrioSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  zona_id: z.number().int().positive("La zona debe ser un número positivo")
});

export const filtroBarrioSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  nombre: z.string().min(1).optional(),
});

// export function validarBarrio<T>(schema: z.ZodSchema<T>, data: unknown): { ok: true; data: T } | { ok: false; errores: z.ZodIssue[] } {
//   const result = schema.safeParse(data);
//   return result.success
//     ? { ok: true, data: result.data }
//     : { ok: false, errores: result.error.issues };
// }