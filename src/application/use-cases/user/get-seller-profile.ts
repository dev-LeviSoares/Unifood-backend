import { GetProfileSellerDTO } from "@/application/dtos/user/get-profile-seller.dto.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class GetSellerProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<GetProfileSellerDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    return {
      fullName: user.fullName.value,
      username: user.username.getValue,
      cpf: user.cpf?.formattedValue ?? null,
      phone: user.phone.getValue,
      companyName: user.companyName?.getValue ?? null,
      photoKey: user.photo?.value ?? null,
      status: user.status,
      birthDate: user.birthDate.value.toISOString().slice(0, 10),
      pixKey: user.pixKey?.format() ?? null,
    };
  }
}