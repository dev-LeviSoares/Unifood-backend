import { RefreshToken } from "@/domain/auth/refresh-token.js";
import { RefreshTokensRepository } from "@/domain/auth/repository/refresh-tokens-repository.js";

export class InMemoryRefreshTokensRepository implements RefreshTokensRepository {
  public items: RefreshToken[] = [];

  async create(refreshToken: RefreshToken): Promise<void> {
    this.items.push(refreshToken);
  }

  async findByTokenHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.items.find((item) => item.tokenHash === tokenHash) ?? null;
  }

  async save(refreshToken: RefreshToken): Promise<void> {
    const index = this.items.findIndex((item) => item.id === refreshToken.id);
    if (index >= 0) this.items[index] = refreshToken;
  }
}