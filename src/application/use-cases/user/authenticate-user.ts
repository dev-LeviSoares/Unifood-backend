import { Encrypter } from "@/application/contracts/auth/encrypter.js";
import { PasswordHasher } from "@/application/contracts/password-hasher.js";
import { AuthenticateUserDTO } from "@/application/dtos/user/authenticate-user.dto.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: PasswordHasher,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(input: AuthenticateUserDTO): Promise<string> {
    const user = await this.usersRepository.findByUsername(input.username);

    if(!user) {
      throw new InvalidCredentialsError("Dados incorretos!");
    }

    const passwordMatches = await this.hashComparer.compare(
      input.password,
      user.passwordHash,
    );

    if(!passwordMatches) {
      throw new InvalidCredentialsError("Dados incorretos!")
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
      role: user.role,
      name: user.fullName.value
    });
    
    return accessToken
  }
}