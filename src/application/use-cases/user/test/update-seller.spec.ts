import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { UpdateSellerProfile } from "../update-seller.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: UpdateSellerProfile;

describe("Update Seller Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new UpdateSellerProfile(inMemoryUsersRepository);
  });

  test("it should be able to update seller profile", async () => {
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

    const result = await sut.execute(seller.id, {
      firstName: "Gabriel",
      lastName: "Lucas",
      username: "gabriel_lucas",
      companyName: "Updated Company name"
    });

    expect(result).toEqual({
      firstName: "Gabriel",
      lastName: "Lucas",
      username: "gabriel_lucas",
      birthDate: "1999-01-01",
      cpf: "111.444.777-35",
      phone: "11999999999",
      companyName: "Updated Company name",
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      pixKey: "joao.pedro@email.com",
      status: "PENDING",
    });
  });

  test("it should not be able to update another a seller that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6", { username: "test" }),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to update a seller with same username", async () => {

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
      pixKey: "joao.pedro123@email.com",
    });

    await expect(
      sut.execute(seller.id, {
        username: "jp1",
      })
    ).rejects.toBeInstanceOf(UsernameAlreadyTakenError);
  });
});