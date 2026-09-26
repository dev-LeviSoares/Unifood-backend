import { z } from "zod";

export const registerStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  phone: z.string(),
  birthDate: z.string(),
});

export type RegisterStudentBody = z.infer<typeof registerStudentSchema>;