import { InvalidCompanyNameError } from "../errors/invalid-company-name-error.js";

export class CompanyName {
  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value.trim();
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new InvalidCompanyNameError("O nome do estabelecimento não pode estar vazio.");
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length < 3) {
      throw new InvalidCompanyNameError("O nome do estabelecimento deve ter pelo menos 3 caracteres.");
    }

    if (trimmedValue.length > 150) {
      throw new InvalidCompanyNameError("O nome do estabelecimento não pode ter mais de 150 caracteres.");
    }
  }

  // Retorna o valor bruto
  public get getValue(): string {
    return this.value;
  }

  // Garante a imutabilidade ao comparar a igualdade por valor, não por referência
  equals(other: CompanyName): boolean {
    if (!(other instanceof CompanyName)) return false;
    return this.value === other.getValue;
  }
}
