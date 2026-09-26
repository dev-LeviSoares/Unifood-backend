import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
})

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Variáveis de ambiente inválidas", parsed.error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

export const env = parsed.data;