import { DomainError } from "@/domain/shared/domain-error.js";

export class PixKeyAlreadyTakenError extends DomainError {
  constructor(pixKey: string) {
    super(`A chave Pix ${pixKey} já está em uso.`);
  }
}
