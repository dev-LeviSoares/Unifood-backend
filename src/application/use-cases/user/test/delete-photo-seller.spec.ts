import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { InvalidUserOperationError } from "@/domain/user/errors/invalid-user-operation-error.js";
import { InvalidPhotoError } from "@/domain/user/errors/invalid-photo-error.js";
import { RegisterSellerUseCase } from "../register-seller.js";
import { DeleteSellerPhotoUseCase } from "../delete-photo-seller.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerSeller: RegisterSellerUseCase;
let sut: DeleteSellerPhotoUseCase;

describe("Delete Seller Photo Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );
    sut = new DeleteSellerPhotoUseCase(inMemoryUsersRepository);
  });

  test("it should be able to delete seller photo", async () => {
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

    await sut.execute(seller.id);

    expect(inMemoryUsersRepository.items[0].photo).toBeNull();
  });

  test("it should not be able to delete photo for a seller that does not exist", async () => {
    await expect(
      sut.execute("f81d4fae-7dec-11d0-a765-00a0c91e6bf6"),
    ).rejects.toBeInstanceOf(InvalidUserOperationError);
  });

  test("it should not be able to delete a photo that does not exist", async () => {
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

    await expect(sut.execute(seller.id)).rejects.toBeInstanceOf(InvalidPhotoError);
  });
});
