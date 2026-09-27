import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidPixKeyError } from "@/domain/user/errors/invalid-pix-key-error.js";
import { PixKeyAlreadyTakenError } from "@/domain/user/errors/pix-key-already-taken-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: RegisterSellerUseCase

describe('Register Seller Use Case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new RegisterSellerUseCase(inMemoryUsersRepository, passwordHasher);
  });
  test('it should be able register seller', async () => {
    const result = await sut.execute({
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
    expect(result.username).toBe("joao_pedro");
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0].passwordHash).toBe("hashed-senha1234");
    expect(inMemoryUsersRepository.items[0].pixKey?.sanitize()).toBe(
      "joao.pedro@email.com",
    );
  });

  test('it should not be able register seller with same username', async () => {
    await sut.execute({
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
      sut.execute({
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "outrasenha",
        phone: "11888888888",
        birthDate: "2000-01-01",
        companyName: "Enterprise name",
        cpf: "09356094071",
        photoKey: "avatars/f91d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
        pixKey: "outro@email.com",
      }),
    ).rejects.toBeInstanceOf(UsernameAlreadyTakenError);
    
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  test("it should not be able register seller with same pix key", async () => {
    await sut.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "11144477735",
      photoKey: null,
      pixKey: "joao.pedro@email.com",
    });

    await expect(
      sut.execute({
        firstName: "Maria",
        lastName: "Souza",
        username: "maria_souza",
        password: "senha1234",
        phone: "11888888888",
        birthDate: "2000-01-01",
        companyName: "Enterprise name",
        cpf: "09356094071",
        photoKey: null,
        pixKey: "joao.pedro@email.com",
      }),
    ).rejects.toBeInstanceOf(PixKeyAlreadyTakenError);

    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  test("it should not be able register seller without pix key", async () => {
    await expect(
      sut.execute({
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "senha1234",
        phone: "11999999999",
        birthDate: "1999-01-01",
        companyName: "Company name",
        cpf: "11144477735",
        photoKey: null,
        pixKey: "   ",
      }),
    ).rejects.toBeInstanceOf(InvalidPixKeyError);

    expect(inMemoryUsersRepository.items).toHaveLength(0);
  });
})