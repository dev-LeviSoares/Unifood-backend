import { GetStudentProfileUseCase } from "@/application/use-cases/user/get-student-profile.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { GetStudentProfileController } from "@/presentation/http/modules/users/controllers/get-student-profile.controller.js";

export function makeGetStudentProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new GetStudentProfileUseCase(usersRepository);

  return new GetStudentProfileController(useCase);
}