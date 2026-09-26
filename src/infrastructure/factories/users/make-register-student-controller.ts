import { RegisterStudentUseCase } from "@/application/use-cases/user/register-student.js";
import { BcryptPasswordHasher } from "@/infrastructure/cryptography/bcrypt-password-hasher.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { PrismaUsersRepository } from "@/infrastructure/database/user/prisma-user-repository.js";
import { RegisterStudentController } from "@/presentation/http/modules/users/controllers/register-student.controller.js";

export function makeRegisterStudentController() {
  const usersRepository = new PrismaUsersRepository(prisma);
  const passwordHasher = new BcryptPasswordHasher();
  const useCase = new RegisterStudentUseCase(usersRepository, passwordHasher);

  return new RegisterStudentController(useCase);
}