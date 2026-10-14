import { DeleteStudentUseCase } from "@/application/use-cases/user/delete-student.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { DeleteStudentController } from "@/presentation/http/modules/users/controllers/delete-student.controller.js";

export function makeDeleteStudentController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new DeleteStudentUseCase(usersRepository);

  return new DeleteStudentController(useCase);
}
