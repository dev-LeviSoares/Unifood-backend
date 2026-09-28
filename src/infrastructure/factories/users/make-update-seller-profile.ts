import { UpdateSellerProfile } from "@/application/use-cases/user/update-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { UpdateSellerController } from "@/presentation/http/modules/users/controllers/update-seller.controller.js";

export function makeUpdateSellerProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new UpdateSellerProfile(usersRepository);

  return new UpdateSellerController(useCase);
}