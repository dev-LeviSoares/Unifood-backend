import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UpdateManagerProfileUseCase } from "../update-manager.js";
import { Role } from "@/domain/user/enum/role.js";
import { User } from "@/domain/user/user.js";
import { FullName } from "@/domain/user/value-objects/full-name.js";
import { Username } from "@/domain/user/value-objects/username.js";
import { Phone } from "@/domain/user/value-objects/phone.js";
import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { Cpf } from "@/domain/user/value-objects/cpf.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: UpdateManagerProfileUseCase;

describe("Update Manager Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new UpdateManagerProfileUseCase(inMemoryUsersRepository);
  });

  test("it should be able to update manager profile", async () => {
    const manager = await createManager({
      username: "joao_manager",
      phone: "11999999999",
      cpf: "11144477735",
    });

    const result = await sut.execute(
      manager.id,
      {
        firstName: "Gabriel",
        lastName: "Lucas",
        username: "gabriel_lucas",
      },
      manager.id,
      Role.MANAGER,
    );

    expect(result).toEqual({
      firstName: "Gabriel",
      lastName: "Lucas",
      username: "gabriel_lucas",
      birthDate: "1999-01-01",
      cpf: "111.444.777-35",
      phone: "11999999999",
      companyName: null,
      photoKey: null,
      pixKey: null,
      status: "ACTIVE",
    });
  });

  test("it should not be able to update a manager that does not exist", async () => {
    await expect(
      sut.execute(
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        { username: "test" },
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        Role.MANAGER,
      ),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to update a manager with same username", async () => {
    await createManager({
      username: "jp1",
      phone: "11999999999",
      cpf: "11144477735",
    });

    const manager = await createManager({
      username: "joao_manager",
      phone: "11999999991",
      cpf: "45280089044",
    });

    await expect(
      sut.execute(
        manager.id,
        { username: "jp1" },
        manager.id,
        Role.MANAGER,
      ),
    ).rejects.toBeInstanceOf(UsernameAlreadyTakenError);
  });
});

async function createManager(input: {
  username: string;
  phone: string;
  cpf: string;
}) {
  const passwordHash = await passwordHasher.hash("senha1234");
  const manager = User.registerManager({
    fullName: FullName.create("Joao", "Pedro"),
    username: new Username(input.username),
    passwordHash,
    phone: new Phone(input.phone),
    birthDate: BirthDate.create("1999-01-01"),
    cpf: new Cpf(input.cpf),
  });

  await inMemoryUsersRepository.create(manager);

  return manager;
}
