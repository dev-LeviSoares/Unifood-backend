import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/infrastructure/env/index.js";

const schema = new URL(env.DATABASE_URL).searchParams.get("schema") ?? "public";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  options: `-c search_path="${schema}"`,
});

const adapter = new PrismaPg(pool, { schema });

export const prisma = new PrismaClient({ adapter });