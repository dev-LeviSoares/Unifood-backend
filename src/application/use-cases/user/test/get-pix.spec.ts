import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { GetPixKeyUseCase } from "../get-pix.js";
import { InvalidPixKeyError } from "@/domain/user/errors/invalid-pix-key-error.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: GetPixKeyUseCase;

describe("Get Pix Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new GetPixKeyUseCase(inMemoryUsersRepository);
  });

  test("it should be able to get pix key", async () => {
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

    const result = await sut.execute(seller.id);

    expect(result).toEqual("joao.pedro@email.com");
  });

  test("it should not be possible to obtain a pix key that does not exist", async () => {
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
      pixKey: null,
    });

    await expect(
      sut.execute(seller.id),
    ).rejects.toBeInstanceOf(InvalidPixKeyError);
  });
});