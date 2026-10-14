import { DeleteSellerPhotoUseCase } from "@/application/use-cases/user/delete-photo-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { DeleteSellerPhotoController } from "@/presentation/http/modules/users/controllers/delete-seller-photo.controller.js";

export function makeDeleteSellerPhotoController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new DeleteSellerPhotoUseCase(usersRepository);

  return new DeleteSellerPhotoController(useCase);
}
