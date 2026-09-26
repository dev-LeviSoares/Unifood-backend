import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidFullNameError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}