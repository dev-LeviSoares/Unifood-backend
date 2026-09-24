import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidUsernameError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
