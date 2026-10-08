import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterStudentUseCase } from "../register-student.js";
import { GetStudentProfileUseCase } from "../get-student-profile.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerStudent: RegisterStudentUseCase;
let sut: GetStudentProfileUseCase;

describe("Get Student Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerStudent = new RegisterStudentUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new GetStudentProfileUseCase(inMemoryUsersRepository);
  });

  test("it should be able to get student profile", async () => {
    const seller = await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
    });

    const result = await sut.execute(seller.id);

    expect(result).toEqual({
      fullName: "Joao Pedro",
      username: "joao_pedro",
      phone: "11999999999",
      status: "ACTIVE",
      birthDate: "1999-01-01",

    });
  });

  test("it should not be able to get a student that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });
});