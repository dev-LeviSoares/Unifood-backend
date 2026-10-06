import { PixKeyType } from "../enum/pix-key-type.js";
import { InvalidPixKeyError } from "../errors/invalid-pix-key-error.js";
import { Cpf } from "./cpf.js";
import { Phone } from "./phone.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_MAX_LENGTH = 77;

export class PixKey {
  private readonly value: string;
  private readonly type: PixKeyType;

  constructor(raw: string) {
    const parsed = this.parse(raw);
    this.value = parsed.value;
    this.type = parsed.type;
  }

  public get getType(): PixKeyType {
    return this.type;
  }

  public sanitize(): string {
    return this.value;
  }

  public format(): string {
    switch (this.type) {
      case PixKeyType.CPF:
        return this.value.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4",
        );
      case PixKeyType.CNPJ:
        return this.value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5",
        );
      case PixKeyType.PHONE:
        return this.formatPhone();
      default:
        return this.value;
    }
  }

  public equals(other: PixKey): boolean {
    return other instanceof PixKey && this.value === other.sanitize();
  }

  private parse(raw: string): { value: string; type: PixKeyType } {
    const trimmed = raw.trim();

    if (!trimmed) {
      throw new InvalidPixKeyError("Chave Pix inválida.");
    }

    if (trimmed.includes("@")) {
      return { value: this.parseEmail(trimmed), type: PixKeyType.EMAIL };
    }

    if (UUID.test(trimmed)) {
      return { value: trimmed.toLowerCase(), type: PixKeyType.RANDOM };
    }

    const digits = trimmed.replace(/\D/g, "");
    const explicitPhone = trimmed.startsWith("+") || /[()]/.test(trimmed);

    if (!explicitPhone && digits.length === 11 && this.isCpf(digits)) {
      return { value: digits, type: PixKeyType.CPF };
    }

    if (!explicitPhone && digits.length === 14 && this.isCnpj(digits)) {
      return { value: digits, type: PixKeyType.CNPJ };
    }

    const phone = this.parsePhone(digits);
    if (phone) {
      return { value: phone, type: PixKeyType.PHONE };
    }

    throw new InvalidPixKeyError("Chave Pix inválida.");
  }

  private parseEmail(email: string): string {
    const normalized = email.toLowerCase();

    if (!EMAIL.test(normalized) || normalized.length > EMAIL_MAX_LENGTH) {
      throw new InvalidPixKeyError("Chave Pix inválida.");
    }

    return normalized;
  }

  private parsePhone(digits: string): string | null {
    let national = digits;

    if (
      digits.startsWith("55") &&
      (digits.length === 12 || digits.length === 13)
    ) {
      national = digits.slice(2);
    }

    if (national.length !== 11) {
      return null;
    }

    try {
      national = new Phone(national).getValue;
    } catch {
      return null;
    }

    if (national[0] === "0" || national[2] !== "9") {
      return null;
    }

    return `+55${national}`;
  }

  private formatPhone(): string {
    const national = this.value.slice(3);
    const ddd = national.slice(0, 2);
    const number = national.slice(2);

    return `+55 (${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
  }

  private isCpf(digits: string): boolean {
    try {
      new Cpf(digits);
      return true;
    } catch {
      return false;
    }
  }

  private isCnpj(digits: string): boolean {
    if (!/^\d{14}$/.test(digits) || /^(\d)\1+$/.test(digits)) {
      return false;
    }

    const first = this.cnpjDigit(digits.slice(0, 12));
    const second = this.cnpjDigit(digits.slice(0, 12) + first);

    return digits === `${digits.slice(0, 12)}${first}${second}`;
  }

  private cnpjDigit(base: string): number {
    let sum = 0;
    let weight = base.length - 7;

    for (let index = base.length; index >= 1; index--) {
      sum += Number(base.charAt(base.length - index)) * weight;
      weight -= 1;
      if (weight < 2) {
        weight = 9;
      }
    }

    return sum % 11 < 2 ? 0 : 11 - (sum % 11);
  }
}
