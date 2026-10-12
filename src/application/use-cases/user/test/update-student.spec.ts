import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterStudentUseCase } from "../register-student.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { UpdateStudentProfileUseCase } from "../update-student.js";
import { Role } from "@/domain/user/enum/role.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerStudent: RegisterStudentUseCase;
let sut: UpdateStudentProfileUseCase;

describe("Update Student Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerStudent = new RegisterStudentUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new UpdateStudentProfileUseCase(inMemoryUsersRepository);
  });

  test("it should be able to update student profile", async () => {
    const student = await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
    });

    const result = await sut.execute(
      student.id,
      {
        firstName: "Gabriel",
        lastName: "Lucas",
        username: "gabriel_lucas",
      },
      student.id,
      Role.STUDENT,
    );

    expect(result).toEqual({
      firstName: "Gabriel",
      lastName: "Lucas",
      username: "gabriel_lucas",
      birthDate: "1999-01-01",
      cpf: null,
      phone: "11999999999",
      companyName: null,
      photoKey: null,
      pixKey: null,
      status: "ACTIVE",
    });
  });

  test("it should not be able to update a student that does not exist", async () => {
    await expect(
      sut.execute(
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        { username: "test" },
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        Role.STUDENT,
      ),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to update a student with same username", async () => {
    await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "jp1",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
    });

    const student = await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999991",
      birthDate: "1999-01-01",
    });

    await expect(
      sut.execute(
        student.id,
        { username: "jp1" },
        student.id,
        Role.STUDENT,
      ),
    ).rejects.toBeInstanceOf(UsernameAlreadyTakenError);
  });
});
