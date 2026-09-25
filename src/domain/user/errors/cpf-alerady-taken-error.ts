import { DomainError } from "@/domain/shared/domain-error.js";

export class CpfAlreadyTakenError extends DomainError {
  constructor(cpf: string) {
    super(`O CPF ${cpf} já está em uso.`);
  }
}