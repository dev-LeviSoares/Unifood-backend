import { UpdateStudentDTO } from "@/application/dtos/user/update-student.dto.js";
import { UpdatedUserDTO } from "@/application/dtos/user/updated-user.dto.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { Username } from "@/domain/user/value-objects/username.js";

export class UpdateStudentProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {} 

  async execute(
    id: string, 
    input: UpdateStudentDTO,
    authenticatedUserId: string,
    authenticatedRole: string
  ): Promise<UpdatedUserDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
    }

    // Student só pode atualizar próprio perfil, Manager pode atualizar qualquer
    if (authenticatedRole === "STUDENT" && authenticatedUserId !== id) {
      throw new InvalidUserOperationError("Você não tem permissão para atualizar este perfil.");
    }
    
    const fullName = 
      input.firstName || input.lastName 
        ? FullName.create(
          input.firstName ?? user.fullName.firstName,
          input.lastName ?? user.fullName.lastName,
        )
        : undefined;

    const username = input.username ? new Username(input.username) : undefined;

    if(username && username.getValue !== user.username.getValue) {
      const taken = await this.usersRepository.findByUsername(username.getValue);

      if (taken) {
        throw new UsernameAlreadyTakenError(username.getValue);
      }
    }

    user.updateStudentProfile({
      fullName,
      username,
      phone: input.phone ? new Phone(input.phone) : undefined,
      birthDate: input.birthDate ? BirthDate.create(input.birthDate) : undefined,
    });

    await this.usersRepository.save(id, user); 

    return {
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
      username: user.username.getValue,
      cpf: user.cpf?.formattedValue ?? null,
      phone: user.phone.getValue,
      companyName: user.companyName?.getValue ?? null,
      photoKey: user.photo?.value ?? null,
      birthDate: user.birthDate.value.toISOString().slice(0, 10),
      status: user.status,
      pixKey: user.pixKey?.format() ?? null
    };
  }
}