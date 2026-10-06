import { ChangeStatusSellerDTO } from "@/application/dtos/user/change-status-seller.dto.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class ChangeStatusSellerUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, input: ChangeStatusSellerDTO): Promise<{ status: string }> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    switch (input.action) {
      case "APPROVE":
        user.approve();
        break;
      case "REJECT":
        user.reject();
        break;
      case "BLOCK":
        user.block();
        break;
      case "REACTIVATE":
        user.reactivate();
        break;
    }

    await this.usersRepository.save(id, user);

    return { status: user.status };
  }
}