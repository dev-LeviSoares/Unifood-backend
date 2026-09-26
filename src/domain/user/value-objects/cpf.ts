import { InvalidCpfError } from "../errors/invalid-cpf-error.js";

export class Cpf {
  private readonly _value: string;

  constructor(value: string) {
    const cleanedValue = this.removerFormatacao(value);

    if (!this.validar(cleanedValue)) {
      throw new InvalidCpfError("CPF inválido.");
    }

    this._value = cleanedValue;
  }

  // Retorna o CPF apenas com números
  public get value(): string {
    return this._value;
  }

  // Retorna o CPF formatado (ex: 123.456.789-00)
  public get formattedValue(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // Garante a imutabilidade ao comparar a igualdade por valor, não por referência
  public equals(other: Cpf): boolean {
    return this._value === other.value;
  }

  private removerFormatacao(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  private validar(cpf: string): boolean {
    if (!cpf || cpf.length !== 11) return false;

    // Elimina CPFs com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }
}
