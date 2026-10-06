import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidCredentialsError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
