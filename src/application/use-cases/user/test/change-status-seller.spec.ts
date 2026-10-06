import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { ChangeStatusSellerUseCase } from "../change-status-seller.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: ChangeStatusSellerUseCase;

describe("Change status a seller Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new ChangeStatusSellerUseCase(inMemoryUsersRepository);
  });

  test("it should be able to change status seller profile", async () => {
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

    const result = await sut.execute(seller.id, { action: "APPROVE"});

    expect(result).toEqual({
      status: "ACTIVE",
    });
  });

  test("it should not be able to change status another a seller that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6", { action: "APPROVE" }),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

});