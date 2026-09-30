import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class GetPixKeyUseCase {
  constructor(private readonly usersRepository: UsersRepository) {} 

  async execute(id: string): Promise<string> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    if (!user.pixKey) {
      throw new InvalidUserOperationError("Chave Pix não cadastrada.");
    }
    
    return user.pixKey.format();
  }
}