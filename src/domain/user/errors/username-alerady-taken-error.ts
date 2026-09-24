import { DomainError } from "@/domain/shared/domain-error.js";

export class UsernameAlreadyTakenError extends DomainError {
  constructor(username: string) {
    super(`O nome de usuário ${username} já está em uso.`);
  }
}