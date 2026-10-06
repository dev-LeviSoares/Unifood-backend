import { BcryptPasswordHasher } from "@/infrastructure/cryptography/bcrypt-password-hasher.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { makeJwtAdapter } from "../jwt/make-jwt-adapter.js";
import { AuthenticateManagerController } from "@/presentation/http/modules/users/controllers/authenticate-manager.controller.js";
import { AuthenticateManagerUseCase } from "@/application/use-cases/user/authenticate-manager.js";

export function makeAuthenticateManagerController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const passwordHasher = new BcryptPasswordHasher();
  const encrypter = makeJwtAdapter();
  const useCase = new AuthenticateManagerUseCase(usersRepository, passwordHasher, encrypter);

  return new AuthenticateManagerController(useCase);
}