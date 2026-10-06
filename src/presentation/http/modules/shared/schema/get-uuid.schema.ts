import { z } from 'zod';

export const uuidSchema = z.object({
  id: z.uuid("ID inválido"),
});