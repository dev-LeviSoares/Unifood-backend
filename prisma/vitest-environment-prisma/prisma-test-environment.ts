/// <reference types="node" />
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import type { Environment } from 'vitest/environments';

function generatDatabaseUrl(schema: string) {
  if(!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE-URL env variable');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema)

  return url.toString();
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generatDatabaseUrl(schema);

    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = databaseUrl;

    // execSync() = executa comandos como se fosse um terminal
    execSync('npx prisma migrate deploy');

    return {
      async teardown() { // Função executada após os teste concluirem
        const { prisma } = await import('../../src/infrastructure/database/prisma.js');
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        await prisma.$disconnect()
      }
    }
  }
}