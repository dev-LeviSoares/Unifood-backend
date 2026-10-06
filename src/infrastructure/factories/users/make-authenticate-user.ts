import { AuthenticateUserUseCase } from "@/application/use-cases/user/authenticate-user.js";
import { BcryptPasswordHasher } from "@/infrastructure/cryptography/bcrypt-password-hasher.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { makeJwtAdapter } from "../jwt/make-jwt-adapter.js";
import { AuthenticateUserController } from "@/presentation/http/modules/users/controllers/authenticate-user.controller.js";

export function makeAuthenticateUserController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const passwordHasher = new BcryptPasswordHasher();
  const encrypter = makeJwtAdapter();
  const useCase = new AuthenticateUserUseCase(usersRepository, passwordHasher, encrypter);

  return new AuthenticateUserController(useCase);
}