import { randomUUID } from "node:crypto";
import { Encrypter } from "@/application/contracts/auth/encrypter.js";
import { PasswordHasher } from "@/application/contracts/password-hasher.js";
import { AuthenticateManagerDTO } from "@/application/dtos/user/authenticate-manager.dto.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { Role } from "@/domain/user/enum/role.js";
import { RefreshTokensRepository } from "@/domain/auth/repository/refresh-tokens-repository.js";
import { RefreshToken } from "@/domain/auth/refresh-token.js";
import { hashToken } from "@/utils/hash-token.js";

export class AuthenticateManagerUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: PasswordHasher,
    private readonly accessEncrypter: Encrypter,
    private readonly refreshEncrypter: Encrypter,
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async execute(input: AuthenticateManagerDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.usersRepository.findByCpf(input.cpf);

    if(!user) {
      throw new InvalidCredentialsError("Dados incorretos!");
    }

    if(user.role !== Role.MANAGER) {
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