import { CompanyName } from "@/domain/user/value-objects/company-name.js";
import { InvalidCompanyNameError } from "@/domain/user/errors/invalid-company-name-error.js";

describe("Create Company Name", () => {
  test("it should be able to validadte the company name", () => {
    const name = "Unifood";
    const validate = new CompanyName(name);

    expect(validate.getValue()).toBe("Unifood");
  });

  test("It should not be possible to create a short company name", () => {
    const shortName = "AB";

    expect(() => {
      new CompanyName(shortName);
    }).toThrow(InvalidCompanyNameError);
  });

  test("It should not be possible to create a long company name", () => {
    const longName =
      "a1B2c3D4e5F6g7H8i9J0k1L12m3N4o" + 
      "5P6q7R8s9T0u1V2w3X4y5Z6a37B8c9D0e" + 
      "1F2g3H4i5J6k7L8m9N0o1P2q23R4s5T" + 
      "6u7V8w9X0y1Z2a3B4c5D6e7F8g9H0i1" + 
      "J2k3L4m5N6o7P8q9R0s1T2u3V4a";

    expect(() => {
      new CompanyName(longName);
    }).toThrow(InvalidCompanyNameError);
  });
});
