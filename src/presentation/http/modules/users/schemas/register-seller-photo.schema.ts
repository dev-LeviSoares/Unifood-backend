import { z } from "zod";

export const registerSellerPhotoSchema = z
  .object({
    photoKey: z.string().trim().min(1),
  })
  .strict();

export type RegisterSellerPhotoBody = z.infer<typeof registerSellerPhotoSchema>;
