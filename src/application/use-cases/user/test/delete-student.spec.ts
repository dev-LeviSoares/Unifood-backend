import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { RegisterStudentUseCase } from "../register-student.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { DeleteStudentUseCase } from "../delete-student.js";
import { Role } from "@/domain/user/enum/role.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerStudent: RegisterStudentUseCase;
let registerSeller: RegisterSellerUseCase;
let sut: DeleteStudentUseCase;

describe("Delete Student Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    const passwordHasher = new FakePasswordHasher();
    registerStudent = new RegisterStudentUseCase(
      inMemoryUsersRepository,
      passwordHasher,
    );
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      passwordHasher,
    );
    sut = new DeleteStudentUseCase(inMemoryUsersRepository);
  });

  test("it should be able to delete a student", async () => {
    const student = await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
    });

    await sut.execute(student.id, student.id, Role.STUDENT);

    expect(inMemoryUsersRepository.items).toHaveLength(0);
  });

  test("it should not be able to delete a student that does not exist", async () => {
    await expect(
      sut.execute(
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        Role.STUDENT,
      ),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to delete another student", async () => {
    const owner = await registerStudent.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
    });

    const other = await registerStudent.execute({
      firstName: "Maria",
      lastName: "Silva",
      username: "maria_silva",
      password: "senha1234",
      phone: "11988888888",
      birthDate: "2000-01-01",
    });

    await expect(
      sut.execute(other.id, owner.id, Role.STUDENT),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);

    expect(inMemoryUsersRepository.items).toHaveLength(2);
  });

  test("it should not be able to delete a seller", async () => {
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

    await expect(
      sut.execute(seller.id, seller.id, Role.MANAGER),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);

    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });
});
