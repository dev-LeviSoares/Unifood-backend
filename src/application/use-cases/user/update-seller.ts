import { UpdateSellerDTO } from "@/application/dtos/user/update-seller.dto.js";
import { UpdatedUserDTO } from "@/application/dtos/user/updated-user.dto.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { CompanyName } from "@/domain/user/value-objects/company-name.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { Photo } from "@/domain/user/value-objects/photo.js";
import { Username } from "@/domain/user/value-objects/username.js";

export class UpdateSellerProfile {
  constructor(private readonly usersRepository: UsersRepository) {} 

  async execute(id: string, input: UpdateSellerDTO): Promise<UpdatedUserDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new InvalidUserOperationError("Usuário não encontrado.");
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

    user.updateSellerProfile({
      fullName,
      username,
      phone: input.phone ? new Phone(input.phone) : undefined,
      birthDate: input.birthDate ? BirthDate.create(input.birthDate) : undefined,
      companyName: input.companyName ? new CompanyName(input.companyName) : undefined,
      photo: input.photoKey === undefined
        ? undefined
        : input.photoKey
          ? Photo.create(input.photoKey)
          : null,
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