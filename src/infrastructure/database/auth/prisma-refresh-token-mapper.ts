import { RefreshToken } from "@/domain/auth/refresh-token.js";

type RefreshTokenRow = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export const PrismaRefreshTokenMapper = {
  toDomain(row: RefreshTokenRow): RefreshToken {
    return RefreshToken.restore({
      id: row.id,
      userId: row.userId,
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
      revokedAt: row.revokedAt,
      createdAt: row.createdAt,
    });
  },
};