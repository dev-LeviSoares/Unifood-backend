import { DeletePixKeyUseCase } from "@/application/use-cases/user/delete-pix.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { DeletePixKeyController } from "@/presentation/http/modules/users/controllers/delete-pix.controller.js";

export function makeDeleteKeyPixController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new DeletePixKeyUseCase(usersRepository);

  return new DeletePixKeyController(useCase);
}