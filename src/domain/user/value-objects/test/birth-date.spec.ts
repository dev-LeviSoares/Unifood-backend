import { BirthDate } from "@/domain/user/value-objects/birth-date.js";
import { InvalidBirthDateError } from "@/domain/user/errors/invalid-birth-date-error.js";

describe('Create birth date', () => {
  test('it should be able to validadte the users date of birth', () => {
    const date = '1999-01-01'
    const birthDate = BirthDate.create(date)

    expect(birthDate.value.getUTCFullYear()).toBe(1999);
    expect(birthDate.value.getUTCMonth()).toBe(0);
    expect(birthDate.value.getUTCDate()).toBe(1);
  })

  test('It should not allow users under the age of 16', () => {
    const dataCom16Anos = new Date();
    dataCom16Anos.setFullYear(dataCom16Anos.getFullYear() - 16);

    expect(() => {
      BirthDate.create(dataCom16Anos.toString())
    }).toThrow(InvalidBirthDateError)
  })

  test('It must not contain future birth data.', () => {
    const futureDate = new Date()

    futureDate.setFullYear(futureDate.getFullYear() + 1);

    expect(() => {
      BirthDate.create(futureDate.toString())
    }).toThrow(InvalidBirthDateError)
  })
});

