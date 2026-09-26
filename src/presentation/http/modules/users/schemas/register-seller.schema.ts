import { z } from "zod";

export const registerSellerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  cpf: z.string(),
  companyName: z.string(),
  photoKey: z.string().nullish(),
});

export type RegisterSellerBody = z.infer<typeof registerSellerSchema>;