import { z } from "zod";

export const authenticateUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AuthenticateUserBody = z.infer<typeof authenticateUserSchema>;