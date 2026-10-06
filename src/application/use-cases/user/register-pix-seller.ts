import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { PixKeyAlreadyTakenError } from "@/domain/user/errors/pix-key-already-taken-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { PixKey } from "@/domain/user/value-objects/pix-key.js";

export class RegisterPixKeySeller {
  constructor(private readonly usersRepository: UsersRepository) {} 

  async execute(id: string, input: string): Promise<string> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    const pixKey = new PixKey(input);
    
    const taken = await this.usersRepository.findByPixKey(pixKey.sanitize());

    if (taken && taken.id !== user.id) {
      throw new PixKeyAlreadyTakenError(pixKey.format());
    }
    user.setPixKey(pixKey);
    
    await this.usersRepository.savePixKey(id, pixKey.sanitize()); 

    return pixKey.format();
  }
}