import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { RegisterStudentUseCase } from "../register-student.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: RegisterStudentUseCase

describe('Register Student Use Case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new RegisterStudentUseCase(inMemoryUsersRepository, passwordHasher);
  });
  test('it should be able register student', async () => {
    const result = await sut.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01"
    });
    expect(result.username).toBe("joao_pedro");
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0].passwordHash).toBe("hashed-senha1234");
  });

  test('it should not be able register student with same username', async () => {
    await sut.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01"
    });

    await expect(
      sut.execute({
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "outrasenha",
        phone: "11888888888",
        birthDate: "2000-01-01",
      }),
    ).rejects.toBeInstanceOf(UsernameAlreadyTakenError);
    
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });


})