import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { UpdateSellerProfile } from "../update-seller.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { RegisterPixKeySeller } from "../register-pix-seller.js";
import { PixKeyAlreadyTakenError } from "@/domain/user/errors/pix-key-already-taken-error.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: RegisterPixKeySeller;

describe("Register Pix Key Seller Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new RegisterPixKeySeller(inMemoryUsersRepository);
  });

  test("it should be able to register pix key seller", async () => {
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

    const result = await sut.execute(seller.id, "joao.pedro@email.com");
    
    expect(result).toEqual("joao.pedro@email.com");
  });

  test("it should not be able to register pix key another a seller that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6", "joao.pedro@email.com"),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("It should not be possible to register an existing Pix", async () => {

    await registerSeller.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "jp1",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "11144477735",
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      pixKey: "joao.pedro@email.com",
    });

    const seller = await registerSeller.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999991",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "45280089044",
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      pixKey: null,
    });

    await expect(
      sut.execute(seller.id, "joao.pedro@email.com")
    ).rejects.toBeInstanceOf(PixKeyAlreadyTakenError);
  });
});