import { InvalidUsernameError } from "../errors/invalid-username-error.js";

export class Username {
  private readonly value: string;

  constructor(value: string) {
    const formattedValue = value.trim().toLowerCase();
    this.validate(formattedValue);
    this.value = formattedValue;
  }

  private validate(username: string): void {
    if (!username || username.length < 3) {
      throw new InvalidUsernameError("O nome de usuário deve ter pelo menos 3 caracteres.");
    }
    
    if (!/^[a-z0-9_]+$/.test(username)) {
      throw new InvalidUsernameError("O nome de usuário deve conter apenas letras minúsculas, números e underline.");
    }
  }

  public get getValue(): string {
    return this.value;
  }

  public equals(other: Username): boolean {
    if (!other) return false;
    return this.value === other.getValue;
  }
}
