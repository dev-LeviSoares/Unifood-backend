import { RegisterSellerUseCase } from "@/application/use-cases/user/register-seller.js";
import { BcryptPasswordHasher } from "@/infrastructure/cryptography/bcrypt-password-hasher.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { RegisterSellerController } from "@/presentation/http/modules/users/controllers/register-seller.controller.js";

export function makeRegisterSellerController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const passwordHasher = new BcryptPasswordHasher();
  const useCase = new RegisterSellerUseCase(usersRepository, passwordHasher);

  return new RegisterSellerController(useCase);
}