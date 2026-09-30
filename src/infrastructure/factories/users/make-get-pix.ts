import { GetPixKeyUseCase } from "@/application/use-cases/user/get-pix.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { GetPixKeyController } from "@/presentation/http/modules/users/controllers/get-pix.controller.js";

export function makeGetKeyPixController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new GetPixKeyUseCase(usersRepository);

  return new GetPixKeyController(useCase);
}