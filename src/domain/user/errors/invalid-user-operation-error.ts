import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidUserOperationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}