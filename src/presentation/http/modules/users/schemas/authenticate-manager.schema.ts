import { z } from "zod";

export const authenticateManagerSchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

export type AuthenticateManagerBody = z.infer<typeof authenticateManagerSchema>;