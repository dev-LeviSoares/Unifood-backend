import { z } from "zod";

export const pixSchema = z.object({
  pix: z.string().trim().min(1),
});

export type PixBody = z.infer<typeof pixSchema>;