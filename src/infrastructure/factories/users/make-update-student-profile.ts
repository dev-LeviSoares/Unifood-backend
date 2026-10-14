import { UpdateStudentProfileUseCase } from "@/application/use-cases/user/update-student.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { UpdateStudentController } from "@/presentation/http/modules/users/controllers/update-student.controller.js";

export function makeUpdateStudentProfileController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new UpdateStudentProfileUseCase(usersRepository);

  return new UpdateStudentController(useCase);
}