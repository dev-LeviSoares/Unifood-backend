import { z } from "zod";

export const changeStatusSellerSchema = z
  .object({
    action: z.enum(["APPROVE", "REJECT", "BLOCK", "REACTIVATE"]),
  })
  .strict();

export type ChangeStatusSellerBody = z.infer<typeof changeStatusSellerSchema>;