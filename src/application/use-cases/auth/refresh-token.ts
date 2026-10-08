import { randomUUID } from "node:crypto";
import { Encrypter } from "@/application/contracts/auth/encrypter.js";
import { Decrypter } from "@/application/contracts/auth/decrypter.js";
import { RefreshToken } from "@/domain/auth/refresh-token.js";
import { RefreshTokensRepository } from "@/domain/auth/repository/refresh-tokens-repository.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { hashToken } from "@/utils/hash-token.js";

type Input = { refreshToken: string };

export class RefreshTokenUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly refreshDecrypter: Decrypter,   // JWT_REFRESH_SECRET
    private readonly accessEncrypter: Encrypter,    // access
    private readonly refreshEncrypter: Encrypter,   // refresh
  ) {}

  async execute(input: Input): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    let payload: { sub: string };

    try {
      payload = await this.refreshDecrypter.decrypt(input.refreshToken);
    } catch {
      throw new InvalidCredentialsError("Refresh token inválido!");
    }

    const stored = await this.refreshTokensRepository.findByTokenHash(
      hashToken(input.refreshToken),
    );

    if (!stored || !stored.isActive) {
      throw new InvalidCredentialsError("Refresh token inválido!");
    }

    // rotação: invalida o refresh atual
    stored.revoke();
    await this.refreshTokensRepository.save(stored);

    const user = await this.usersRepository.findById(payload.sub);

    if (!user) {
      throw new InvalidCredentialsError("Refresh token inválido!");
    }

    const accessToken = await this.accessEncrypter.encrypt({
      sub: user.id,
      role: user.role,
      name: user.fullName.value,
    });

    const refreshToken = await this.refreshEncrypter.encrypt({
      sub: user.id,
      jti: randomUUID(),
    });

    await this.refreshTokensRepository.create(
      RefreshToken.create({
        userId: user.id,
        tokenHash: hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }),
    );

    return { accessToken, refreshToken };
  }
}