import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { FakeEncrypter } from "@/infrastructure/auth/test/fake-jwt-encrypter.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { AuthenticateManagerUseCase } from "../authenticate-manager.js";
import { User } from "@/domain/user/user.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Username } from "@/domain/user/value-objects/username.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { Cpf } from "@/domain/user/value-objects/cpf.js";
import { InMemoryRefreshTokensRepository } from "@/infrastructure/database/auth/in-memory-refresh-token-repository.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryRefreshTokensRepository: InMemoryRefreshTokensRepository;
let registerSeller: RegisterSellerUseCase;
let passwordHasher: FakePasswordHasher;
let sut: AuthenticateManagerUseCase;

describe("Authenticate manager Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryRefreshTokensRepository = new InMemoryRefreshTokensRepository();
    passwordHasher = new FakePasswordHasher();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      passwordHasher,
    );
    sut = new AuthenticateManagerUseCase(
      inMemoryUsersRepository,
      passwordHasher,
      new FakeEncrypter(),
      new FakeEncrypter(),
      inMemoryRefreshTokensRepository,
    );
  });

  test("it should be able to authenticate manager", async () => {
    const passwordHash = await passwordHasher.hash("senha1234");
    const manager = User.registerManager({
      fullName: FullName.create("Joao", "Pedro"),
      username: new Username("joao_manager"),
      passwordHash,
      phone: new Phone("11999999999"),
      birthDate: BirthDate.create("1999-01-01"),
      cpf: new Cpf("11144477735"),
    });

    await inMemoryUsersRepository.create(manager);

    const result = await sut.execute({
      cpf: "11144477735",
      password: "senha1234",
    });

    expect(result.accessToken).toBe(
      JSON.stringify({
        sub: manager.id,
        role: "MANAGER",
        name: "Joao Pedro",
      }),
    );
    expect(JSON.parse(result.refreshToken)).toEqual({
      sub: manager.id,
      jti: expect.any(String),
    });
    expect(inMemoryRefreshTokensRepository.items).toHaveLength(1);
  });

  test("it should not be able to authenticate a seller as manager", async () => {
    await registerSeller.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "11144477735",
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      pixKey: "joao.pedro@email.com",
    });

    await expect(
      sut.execute({ cpf: "11144477735", password: "senha1234" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("it should not be able to authenticate a manager that does not exist", async () => {
    await expect(
      sut.execute({ cpf: "11144477735", password: "senha1234" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
