import { RegisterStudentDTO } from "@/application/dtos/user/register-student.dto.js";
import { RegisteredUserDTO } from "@/application/dtos/user/registered-user.dto.js";
import { PasswordHasher } from "@/application/ports/password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";
import { User } from "@/domain/user/user.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { Username } from "@/domain/user/value-objects/username.js";

export class RegisterStudentUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterStudentDTO): Promise<RegisteredUserDTO> {
    const fullName = FullName.create(input.firstName, input.lastName);
    const username = new Username(input.username);
    const phone = new Phone(input.phone);
    const birthDate = BirthDate.create(input.birthDate);

    if (input.password.trim().length < 8) {
      throw new InvalidUserOperationError(
        "A senha deve ter pelo menos 8 caracteres"
      );
    }
    const existing = await this.usersRepository.findByUsername(
      username.getValue,
    );

    if (existing) {
      throw new UsernameAlreadyTakenError(username.getValue);
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = User.registerStudent({
      fullName,
      username,
      passwordHash,
      phone,
      birthDate
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