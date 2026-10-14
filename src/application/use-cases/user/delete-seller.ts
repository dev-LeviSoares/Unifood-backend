import { Role } from "@/domain/user/enum/role.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class DeleteSellerUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    id: string,
    authenticatedUserId: string,
    authenticatedRole: string,
  ): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    if (authenticatedRole === Role.SELLER && authenticatedUserId !== id) {
      throw new InvalidUserOperationError("Você não tem permissão para deletar este perfil.");
    }

    if (user.role !== Role.SELLER) {
      throw new InvalidUserOperationError("Este perfil não permite essa operação.");
    }

    await this.usersRepository.delete(id);
  }
}
