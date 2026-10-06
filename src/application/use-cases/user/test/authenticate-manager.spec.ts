import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { FakeEncrypter } from "@/infrastructure/cryptography/fake-jwt-encrypter.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { AuthenticateManagerUseCase } from "../authenticate-manager.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase
let sut: AuthenticateManagerUseCase;

describe("Change status a seller Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new AuthenticateManagerUseCase(
      inMemoryUsersRepository, 
      new FakePasswordHasher(), 
      new FakeEncrypter()
    );
  });

  test("it should be able to authenticate manager", async () => {
    const seller = await registerSeller.execute({
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

    const result = await sut.execute({ cpf:"11144477735", password: "senha1234"});

    expect(result).toEqual(JSON.stringify({ sub: seller.id }));
  });

  test("it should not be able to authenticate another manager that does not exist", async () => {
    await expect(
      sut.execute({ cpf:"11144477735", password: "senha1234"}),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

});