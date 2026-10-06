import { z } from "zod";

export const updateSellerSchema = z
  .object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    username: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(1).optional(),
    birthDate: z.string().trim().min(1).optional(),
    companyName: z.string().trim().min(1).optional(),
    photoKey: z.string().trim().min(1).nullish(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

export type UpdateSellerBody = z.infer<typeof updateSellerSchema>;