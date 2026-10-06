import { ChangeStatusSellerUseCase } from "@/application/use-cases/user/change-status-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { ChangeStatusSellerController } from "@/presentation/http/modules/users/controllers/change-status-seller.controller.js";

export function makeChangeStatusSellerController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new ChangeStatusSellerUseCase(usersRepository);

  return new ChangeStatusSellerController(useCase);
}