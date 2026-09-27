import { PixKeyType } from "@/domain/user/enum/pix-key-type.js";
import { InvalidPixKeyError } from "@/domain/user/errors/invalid-pix-key-error.js";
import { PixKey } from "@/domain/user/value-objects/pix-key.js";

describe("Pix Key", () => {
  test("it should sanitize, format and type a cpf key", () => {
    const pixKey = new PixKey("111.444.777-35");

    expect(pixKey.getType).toBe(PixKeyType.CPF);
    expect(pixKey.sanitize()).toBe("11144477735");
    expect(pixKey.format()).toBe("111.444.777-35");
  });

  test("it should sanitize, format and type a cnpj key", () => {
    const pixKey = new PixKey("11.222.333/0001-81");

    expect(pixKey.getType).toBe(PixKeyType.CNPJ);
    expect(pixKey.sanitize()).toBe("11222333000181");
    expect(pixKey.format()).toBe("11.222.333/0001-81");
  });

  test("it should sanitize, format and type an email key", () => {
    const pixKey = new PixKey("  Joao.Pedro@Email.com ");

    expect(pixKey.getType).toBe(PixKeyType.EMAIL);
    expect(pixKey.sanitize()).toBe("joao.pedro@email.com");
    expect(pixKey.format()).toBe("joao.pedro@email.com");
  });

  test("it should sanitize, format and type a phone key", () => {
    const pixKey = new PixKey("(11) 99999-9999");

    expect(pixKey.getType).toBe(PixKeyType.PHONE);
    expect(pixKey.sanitize()).toBe("+5511999999999");
    expect(pixKey.format()).toBe("+55 (11) 99999-9999");
  });

  test("it should sanitize, format and type a random key", () => {
    const pixKey = new PixKey("F81D4FAE-7DEC-11D0-A765-00A0C91E6BF6");

    expect(pixKey.getType).toBe(PixKeyType.RANDOM);
    expect(pixKey.sanitize()).toBe("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
    expect(pixKey.format()).toBe("f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
  });

  test("it should not create an invalid pix key", () => {
    expect(() => new PixKey("   ")).toThrow(InvalidPixKeyError);
    expect(() => new PixKey("chave-invalida")).toThrow(InvalidPixKeyError);
  });
});
