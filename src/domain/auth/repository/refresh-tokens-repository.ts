import type { RefreshToken } from "@/domain/auth/refresh-token.js";

export interface RefreshTokensRepository {
  create(refreshToken: RefreshToken): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
  save(refreshToken: RefreshToken): Promise<void>; // para revoke
}