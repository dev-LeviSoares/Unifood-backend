import { GetProfileSellerDTO } from "@/application/dtos/user/get-profile-seller.dto.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { Role } from "@/domain/user/enum/role.js";

export class GetSellerProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, authenticatedUserId?: string, authenticatedUserRole?: string): Promise<GetProfileSellerDTO> {
    // Validação de ownership: SELLER só pode ver o próprio perfil
    if (authenticatedUserId && authenticatedUserRole === Role.SELLER && authenticatedUserId !== id) {
      throw new InvalidUserOperationError("Você não tem permissão para visualizar este perfil.");
    }
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