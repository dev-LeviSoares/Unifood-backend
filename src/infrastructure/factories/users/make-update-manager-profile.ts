import { UpdateManagerProfileUseCase } from "@/application/use-cases/user/update-manager.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { UpdateManagerController } from "@/presentation/http/modules/users/controllers/update-manager.controller.js";

export function makeUpdateManagerProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new UpdateManagerProfileUseCase(usersRepository);

  return new UpdateManagerController(useCase);
}
