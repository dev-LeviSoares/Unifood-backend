import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { InvalidPhotoError } from "@/domain/user/errors/invalid-photo-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { RegisterSellerPhotoUseCase } from "../register-photo-seller.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: RegisterSellerPhotoUseCase;

describe("Register Seller Photo Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new RegisterSellerPhotoUseCase(inMemoryUsersRepository);
  });

  test("it should be able to register seller photo", async () => {
    const seller = await registerSeller.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "11144477735",
      photoKey: null,
      pixKey: null,
    });

    const result = await sut.execute(
      seller.id,
      "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
    );

    expect(result).toEqual("avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png");
    expect(inMemoryUsersRepository.items[0].photo?.value).toBe(
      "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
    );
  });

  test("it should be able to replace an existing seller photo", async () => {
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
      pixKey: null,
    });

    const result = await sut.execute(
      seller.id,
      "avatars/a81d4fae-7dec-11d0-a765-00a0c91e6bf6.webp",
    );

    expect(result).toEqual("avatars/a81d4fae-7dec-11d0-a765-00a0c91e6bf6.webp");
    expect(inMemoryUsersRepository.items[0].photo?.value).toBe(
      "avatars/a81d4fae-7dec-11d0-a765-00a0c91e6bf6.webp",
    );
  });

  test("it should not be able to register photo for a seller that does not exist", async () => {
    await expect(
      sut.execute(
        "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      ),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to register an invalid photo key", async () => {
    const seller = await registerSeller.execute({
      firstName: "Joao",
      lastName: "Pedro",
      username: "joao_pedro",
      password: "senha1234",
      phone: "11999999999",
      birthDate: "1999-01-01",
      companyName: "Company name",
      cpf: "11144477735",
      photoKey: null,
      pixKey: null,
    });

    await expect(
      sut.execute(seller.id, "invalid-photo.png"),
    ).rejects.toBeInstanceOf(InvalidPhotoError);
  });
});
