import { InMemoryUsersRepository } from "@/infrastructure/database/user/in-memory-users-repository.js";
import { InMemoryRefreshTokensRepository } from "@/infrastructure/database/auth/in-memory-refresh-token-repository.js";
import { FakePasswordHasher } from "@/infrastructure/cryptography/fake-password-hasher.js";
import { FakeEncrypter } from "@/infrastructure/auth/test/fake-jwt-encrypter.js";
import { FakeDecrypter } from "@/infrastructure/auth/test/fake-jwt-decrypter.js";
import { RegisterSellerUseCase } from "../../user/register-seller.js";
import { AuthenticateUserUseCase } from "../../user/authenticate-user.js";
import { RefreshTokenUseCase } from "../refresh-token.js";
import { InvalidCredentialsError } from "@/domain/user/errors/invalid-credentials-error.js";
import { hashToken } from "@/utils/hash-token.js";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryRefreshTokensRepository: InMemoryRefreshTokensRepository;
let authenticateUser: AuthenticateUserUseCase;
let sut: RefreshTokenUseCase;

describe("Refresh token Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryRefreshTokensRepository = new InMemoryRefreshTokensRepository();

    const registerSeller = new RegisterSellerUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
    );

    authenticateUser = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      new FakePasswordHasher(),
      new FakeEncrypter(),
      new FakeEncrypter(),
      inMemoryRefreshTokensRepository,
    );

    sut = new RefreshTokenUseCase(
      inMemoryUsersRepository,
      inMemoryRefreshTokensRepository,
      new FakeDecrypter(),
      new FakeEncrypter(),
      new FakeEncrypter(),
    );

    return registerSeller.execute({
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
  });

  test("it should be able to refresh tokens", async () => {
    const login = await authenticateUser.execute({
      username: "joao_pedro",
      password: "senha1234",
    });

    const result = await sut.execute({
      refreshToken: login.refreshToken,
    });

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(result.refreshToken).not.toBe(login.refreshToken);

    const oldStored = await inMemoryRefreshTokensRepository.findByTokenHash(
      hashToken(login.refreshToken),
    );
    expect(oldStored?.isRevoked).toBe(true);
    expect(inMemoryRefreshTokensRepository.items).toHaveLength(2);
    expect(inMemoryRefreshTokensRepository.items.filter((item) => item.isActive)).toHaveLength(1);
  });

  test("it should not be able to reuse a revoked refresh token", async () => {
    const login = await authenticateUser.execute({
      username: "joao_pedro",
      password: "senha1234",
    });

    await sut.execute({ refreshToken: login.refreshToken });

    await expect(
      sut.execute({ refreshToken: login.refreshToken }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("it should not be able to refresh with an invalid token", async () => {
    await expect(
      sut.execute({ refreshToken: "invalid-token" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
