import { randomUUID } from "node:crypto";
import { Encrypter } from "@/application/contracts/auth/encrypter.js";
import { PasswordHasher } from "@/application/contracts/password-hasher.js";
import { AuthenticateUserDTO } from "@/application/dtos/user/authenticate-user.dto.js";
import { RefreshToken } from "@/domain/auth/refresh-token.js";
import { RefreshTokensRepository } from "@/domain/auth/repository/refresh-tokens-repository.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { hashToken } from "@/utils/hash-token.js";

export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: PasswordHasher,
    private readonly accessEncrypter: Encrypter,
    private readonly refreshEncrypter: Encrypter,
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async execute(input: AuthenticateUserDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.usersRepository.findByUsername(input.username);

    if(!user) {
      throw new InvalidCredentialsError("Dados incorretos!");
    }

    const passwordMatches = await this.hashComparer.compare(
      input.password,
      user.passwordHash,
    );

    if(!passwordMatches) {
      throw new InvalidCredentialsError("Dados incorretos!")
    }

    const accessToken = await this.accessEncrypter.encrypt({
      sub: user.id,
      role: user.role,
      name: user.fullName.value
    });
    
    const refreshToken = await this.refreshEncrypter.encrypt({
      sub: user.id,
      jti: randomUUID(),
    });

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    );

    await this.refreshTokensRepository.create(
      RefreshToken.create({
        userId: user.id,
        tokenHash: hashToken(refreshToken),
        expiresAt,
      }),
    );
    
    return { 
      accessToken,
      refreshToken,
    }
  }
}