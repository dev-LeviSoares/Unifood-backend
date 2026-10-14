import { RegisterSellerPhotoUseCase } from "@/application/use-cases/user/register-photo-seller.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { RegisterSellerPhotoController } from "@/presentation/http/modules/users/controllers/register-seller-photo.controller.js";

export function makeRegisterSellerPhotoController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new RegisterSellerPhotoUseCase(usersRepository);

  return new RegisterSellerPhotoController(useCase);
}
