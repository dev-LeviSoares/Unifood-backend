import { InvalidFullNameError } from "../errors/invalid-full-name-error.js";

export class FullName {
  private readonly _firstName: string;
  private readonly _lastName: string;

  private constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  public static create(firstName: string, lastName: string): FullName {
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
  
    if (normalizedFirstName.length < 2 || normalizedFirstName.length > 50) {
      throw new InvalidFullNameError("Nome inválido.");
    }
  
    if (normalizedLastName.length < 2 || normalizedLastName.length > 50) {
      throw new InvalidFullNameError("Sobrenome inválido.");
    }
  
    return new FullName(normalizedFirstName, normalizedLastName);
  }

  public get value(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  public get firstName(): string {
    return this._firstName;
  }
  public get lastName(): string {
    return this._lastName;
  }
  
}