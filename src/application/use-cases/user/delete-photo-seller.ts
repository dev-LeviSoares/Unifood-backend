import { InvalidPhotoError } from "@/domain/user/errors/invalid-photo-error.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class DeleteSellerPhotoUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(authenticatedUserId: string): Promise<void> {
    const user = await this.usersRepository.findById(authenticatedUserId);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    if (!user.photo) {
      throw new InvalidPhotoError("Foto não cadastrada.");
    }

    user.deletePhoto();

    await this.usersRepository.save(user.id, user);
  }
}
