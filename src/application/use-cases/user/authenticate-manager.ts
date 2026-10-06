import { Encrypter } from "@/application/contracts/encrypter.js";
import { PasswordHasher } from "@/application/contracts/password-hasher.js";
import { AuthenticateManagerDTO } from "@/application/dtos/user/authenticate-manager.dto.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { UsersRepository } from "@/domain/user/repository/users-repository.js";

export class AuthenticateManagerUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: PasswordHasher,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(input: AuthenticateManagerDTO): Promise<string> {
    const user = await this.usersRepository.findByCpf(input.cpf);

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
    });
    
    return accessToken
  }
}