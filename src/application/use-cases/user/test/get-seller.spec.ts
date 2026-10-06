import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { GetSellerProfileUseCase } from "../get-seller-profile.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: GetSellerProfileUseCase;

describe("Get Seller Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new GetSellerProfileUseCase(inMemoryUsersRepository);
  });

  test("it should be able to get seller profile", async () => {
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

    expect(result).toEqual({
      fullName: "Joao Pedro",
      username: "joao_pedro",
      cpf: "111.444.777-35",
      phone: "11999999999",
      companyName: "Company name",
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      status: "PENDING",
      birthDate: "1999-01-01",
      pixKey: "joao.pedro@email.com",
    });
  });

  test("it should not be able to get a seller that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });
});