import { BcryptPasswordHasher } from "@/infrastructure/cryptography/bcrypt-password-hasher.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { makeJwtAdapter } from "../jwt/make-jwt-adapter.js";
import { AuthenticateManagerController } from "@/presentation/http/modules/users/controllers/authenticate-manager.controller.js";
import { AuthenticateManagerUseCase } from "@/application/use-cases/user/authenticate-manager.js";
import { makeJwtRefreshAdapter } from "../jwt/make-jwt-refresh-adapter.js";
import { PrismaRefreshTokensRepository } from "@/infrastructure/database/auth/prisma-refresh-token-repository.js";

export function makeAuthenticateManagerController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const passwordHasher = new BcryptPasswordHasher();
  const useCase = new AuthenticateManagerUseCase(
    usersRepository,
    passwordHasher,
    makeJwtAdapter(),
    makeJwtRefreshAdapter(),
    new PrismaRefreshTokensRepository(prisma),
  );

  return new AuthenticateManagerController(useCase);
}