import { z } from "zod";

export const updateStudentSchema = z
  .object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    username: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(1).optional(),
    birthDate: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export type UpdateStudentBody = z.infer<typeof updateStudentSchema>;