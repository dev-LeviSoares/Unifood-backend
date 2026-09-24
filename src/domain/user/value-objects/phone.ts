import { InvalidPhoneError } from "../errors/invalid-phone.error.js";

export class Phone {
  private readonly value: string;

  constructor(phone: string) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (!this.validate(cleaned)) {
      throw new InvalidPhoneError('Número de telefone inválido.');
    }
    
    this.value = cleaned;
  }

  private validate(phone: string): boolean {
    // Validação básica para números do Brasil (com DDD: 10 ou 11 dígitos)
    return phone.length >= 10 && phone.length <= 11;
  }

  public getValue(): string {
    return this.value;
  }

  public format(): string {
    if (this.value.length === 11) {
      return `(${this.value.slice(0, 2)}) ${this.value.slice(2, 7)}-${this.value.slice(7)}`;
    }
    return `(${this.value.slice(0, 2)}) ${this.value.slice(2, 6)}-${this.value.slice(6)}`;
  }
  
  // Garante a imutabilidade ao comparar a igualdade por valor, não por referência
  public equals(other: Phone): boolean {
    return other instanceof Phone && this.value === other.value;
  }
}
