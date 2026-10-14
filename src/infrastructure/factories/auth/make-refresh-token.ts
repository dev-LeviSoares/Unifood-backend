import { RefreshTokenUseCase } from "@/application/use-cases/auth/refresh-token.js";
import { PrismaRefreshTokensRepository } from "@/infrastructure/database/auth/prisma-refresh-token-repository.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { RefreshTokenController } from "@/presentation/http/modules/auth/controllers/refresh-token.controller.js";
import { makeJwtAdapter } from "../jwt/make-jwt-adapter.js";
import { makeJwtRefreshAdapter } from "../jwt/make-jwt-refresh-adapter.js";
import { makeJwtRefreshDecrypter } from "../jwt/make-jwt-refresh-decrypter.js";

export function makeRefreshTokenController() {
  const useCase = new RefreshTokenUseCase(
    new PrismaUsersRepository(prisma),
    new PrismaRefreshTokensRepository(prisma),
    makeJwtRefreshDecrypter(),
    makeJwtAdapter(),
    makeJwtRefreshAdapter(),
  );

  return new RefreshTokenController(useCase);
}
