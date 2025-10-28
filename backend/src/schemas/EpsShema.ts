import { z } from "zod";

export const epsSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

export const filtroEpsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  nombre: z.string().min(1).optional(),
});

// export function validarEps<T>(schema: z.ZodSchema<T>, data: unknown): { ok: true; data: T } | { ok: false; errores: z.ZodIssue[] } {
//   const result = schema.safeParse(data);
//   return result.success
//     ? { ok: true, data: result.data }
//     : { ok: false, errores: result.error.issues };
// }