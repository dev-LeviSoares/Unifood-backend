import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { GetManagerProfileUseCase } from "../get-manager-profile.js";
import { User } from "@/domain/user/user.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Username } from "@/domain/user/value-objects/username.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { Cpf } from "@/domain/user/value-objects/cpf.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: GetManagerProfileUseCase;

describe("Get Manager Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new GetManagerProfileUseCase(inMemoryUsersRepository);
  });

  test("it should be able to get manager profile", async () => {
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

    const result = await sut.execute(manager.id);

    expect(result).toEqual({
      fullName: "Joao Pedro",
      username: "joao_manager",
      cpf: "11144477735",
      phone: "11999999999",
      status: "ACTIVE",
      birthDate: "1999-01-01",
      createdAt: manager.createdAt,
      updatedAt: manager.updatedAt,
    });
  });

  test("it should not be able to get a manager that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });
});