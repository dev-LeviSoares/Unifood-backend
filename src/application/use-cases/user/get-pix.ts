import { InvalidPixKeyError } from "@/domain/user/errors/invalid-pix-key-error.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { Role } from "@/domain/user/enum/role.js";

export class GetPixKeyUseCase {
  constructor(private readonly usersRepository: UsersRepository) {} 

  async execute(id: string, authenticatedUserId?: string, authenticatedUserRole?: string): Promise<string> {
    // Validação de ownership: SELLER só pode ver a própria chave PIX
    if (authenticatedUserId && authenticatedUserRole === Role.SELLER && authenticatedUserId !== id) {
      throw new InvalidUserOperationError("Você não tem permissão para visualizar esta chave PIX.");
    }
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    if (!user.pixKey) {
      throw new InvalidPixKeyError("Chave Pix não cadastrada.");
    }
    
    return user.pixKey.format();
  }
}