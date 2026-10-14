import { RefreshToken } from "@/domain/auth/refresh-token.js";
import { RefreshTokensRepository } from "@/domain/auth/repository/refresh-tokens-repository.js";
import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaRefreshTokenMapper } from "./prisma-refresh-token-mapper.js";

export class PrismaRefreshTokensRepository implements RefreshTokensRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(refreshToken: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: refreshToken.id,
        userId: refreshToken.userId,
        tokenHash: refreshToken.tokenHash,
        expiresAt: refreshToken.expiresAt,
        revokedAt: refreshToken.revokedAt,
        createdAt: refreshToken.createdAt,
      },
    });
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    const row = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
    });

    if (!row) return null;

    return PrismaRefreshTokenMapper.toDomain(row);
  }

  async save(refreshToken: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: refreshToken.id },
      data: {
        revokedAt: refreshToken.revokedAt,
        expiresAt: refreshToken.expiresAt,
      },
    });
  }
}