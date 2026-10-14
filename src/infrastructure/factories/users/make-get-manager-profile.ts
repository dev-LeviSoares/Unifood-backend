import { GetManagerProfileUseCase } from "@/application/use-cases/user/get-manager-profile.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { GetManagerProfileController } from "@/presentation/http/modules/users/controllers/get-manager-profile.controller.js";

export function makeGetManagerProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new GetManagerProfileUseCase(usersRepository);

  return new GetManagerProfileController(useCase);
}