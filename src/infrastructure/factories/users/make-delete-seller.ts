import { DeleteSellerUseCase } from "@/application/use-cases/user/delete-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { DeleteSellerController } from "@/presentation/http/modules/users/controllers/delete-seller.controller.js";

export function makeDeleteSellerController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new DeleteSellerUseCase(usersRepository);

  return new DeleteSellerController(useCase);
}
