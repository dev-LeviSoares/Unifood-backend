import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { Photo } from "@/domain/user/value-objects/photo.js";

export class RegisterSellerPhotoUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(authenticatedUserId: string, photoKey: string): Promise<string> {
    const user = await this.usersRepository.findById(authenticatedUserId);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    const photo = Photo.create(photoKey);
    user.setPhoto(photo);

    await this.usersRepository.save(user.id, user);

    return photo.value;
  }
}
