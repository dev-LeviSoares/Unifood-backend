import { FullName } from "@/domain/user/value-objects/full-name.js";
import { InvalidFullNameError } from "@/domain/user/errors/invalid-full-name-error.js";

describe("Create Full Name", () => {
  test("it should be able to validate the full name", () => {
    const firstValue = "Joao";
    const secondValue = "Pedro";
    const fullName = FullName.create(firstValue, secondValue);

    expect(fullName.value).toBe("Joao Pedro");
  });

  test("It should not be possible to create a short first or last name", () => {
    const firstValue = "A";
    const secondValue = "B";

    expect(() => {
      FullName.create(firstValue, secondValue);
    }).toThrow(InvalidFullNameError);
  });
});
