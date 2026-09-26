import { RegisterSellerDTO } from "@/application/dtos/user/register-seller.dto.js";
import { RegisteredUserDTO } from "@/application/dtos/user/registered-user.dto.js";
import { PasswordHasher } from "@/application/ports/password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { User } from "@/domain/user/user.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { CompanyName } from "@/domain/user/value-objects/company-name.js";
import { Cpf } from "@/domain/user/value-objects/cpf.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { Photo } from "@/domain/user/value-objects/photo.js";
import { Username } from "@/domain/user/value-objects/username.js";

export class RegisterSellerUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterSellerDTO): Promise<RegisteredUserDTO> {
    const fullName = FullName.create(input.firstName, input.lastName);
    const username = new Username(input.username);
    const phone = new Phone(input.phone);
    const birthDate = BirthDate.create(input.birthDate);
    const cpf = new Cpf(input.cpf);
    const companyName = new CompanyName(input.companyName);
    const photo = input.photoKey ? Photo.create(input.photoKey) : null;

    if (input.password.trim().length < 8) {
      throw new InvalidUserOperationError(
        "A senha deve ter pelo menos 8 caracteres"
      );
    }
    
    if (await this.usersRepository.findByUsername(username.getValue)) {
      throw new UsernameAlreadyTakenError(username.getValue);
    }

    if (await this.usersRepository.findByCpf(cpf.value)) {
      throw new UsernameAlreadyTakenError(username.getValue);
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = User.registerSeller({
      fullName,
      username,
      passwordHash,
      phone,
      birthDate,
      cpf,
      companyName,
      photo,
    });

    await this.usersRepository.create(user);

    return {
      id: user.id,
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
      username: user.username.getValue,
      role: user.role,
      status: user.status
    };
  }
}