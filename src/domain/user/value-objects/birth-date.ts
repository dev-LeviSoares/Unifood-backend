import { InvalidBirthDateError } from "../errors/invalid-birth-date-error.js";

const MINIMUM_AGE = 16;

export class BirthDate {
  private constructor(
    private date: Date
  ) {}

  static create(raw: string): BirthDate {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);

    if (!match) {
      throw new InvalidBirthDateError(
        "A data de nascimento deve estar no formato AAAA-MM-DD.",
      );
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));

    const isRealDate =
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day;

    if (!isRealDate) {
      throw new InvalidBirthDateError("Data de nascimento inválida.");
    }

    const today = new Date();

    const todayUtc = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
    );

    if (date.getTime() > todayUtc) {
      throw new InvalidBirthDateError(
        "A data de nascimento não pode ser futura.",
      );
    }

    if (BirthDate.ageInYears(date) < MINIMUM_AGE) {
      throw new InvalidBirthDateError(
        `A idade mínima para cadastro é ${MINIMUM_AGE} anos.`,
      );
    }

    return new BirthDate(date)
  }

  get value(): Date {
    return this.date;
  }

  private static ageInYears(birth: Date): number {
    const today = new Date();
    let age = today.getUTCFullYear() - birth.getUTCFullYear();
    const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
    const dayDiff = today.getUTCDate() - birth.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }
    return age;
  }
}