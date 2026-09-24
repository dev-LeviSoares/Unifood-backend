import { Cpf } from "@/domain/user/value-objects/cpf.js";
import { InvalidCpfError } from "@/domain/user/errors/invalid-cpf-error.js";

describe("Create Company Name", () => {
  test("it should be able to validadte the cpf", () => {
    const value = "111.444.777-35";
    const cpf = new Cpf(value);

    expect(cpf.value).toBe("11144477735");
  });

  test("It should not be possible to create a cpf invalid", () => {
    const invalidValue = "000.000.000-00";

    expect(() => {
      new Cpf(invalidValue);
    }).toThrow(InvalidCpfError);
  });
});
