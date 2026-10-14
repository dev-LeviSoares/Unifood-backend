import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { Role } from "@/domain/user/enum/role.js";
import { GetProfileStudentDTO } from "@/application/dtos/user/get-profile-student.dto.js";

export class GetStudentProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, authenticatedUserId?: string, authenticatedUserRole?: string): Promise<GetProfileStudentDTO> {
    // Validação de ownership: STUDENT só pode ver o próprio perfil
    if (authenticatedUserId && authenticatedUserRole === Role.STUDENT && authenticatedUserId !== id) {
      throw new InvalidUserOperationError("Você não tem permissão para visualizar este perfil.");
    }
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    return {
      fullName: user.fullName.value,
      username: user.username.getValue,
      phone: user.phone.getValue,
      status: user.status,
      birthDate: user.birthDate.value.toISOString().slice(0, 10),
    };
  }
}