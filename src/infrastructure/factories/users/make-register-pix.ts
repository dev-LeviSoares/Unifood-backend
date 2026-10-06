import { RegisterPixKeySeller } from "@/application/use-cases/user/register-pix-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { RegisterPixController } from "@/presentation/http/modules/users/controllers/register-pix-seller.controller.js";

export function makeRegisterPixController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new RegisterPixKeySeller(usersRepository);

  return new RegisterPixController(useCase);
}