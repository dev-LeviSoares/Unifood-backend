import { GetSellerProfileUseCase } from "@/application/use-cases/user/get-seller-profile.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { GetSellerProfileController } from "@/presentation/http/modules/users/controllers/get-seller-profile.controller.js";

export function makeGetSellerProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new GetSellerProfileUseCase(usersRepository);

  return new GetSellerProfileController(useCase);
}