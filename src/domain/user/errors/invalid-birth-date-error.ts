import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidBirthDateError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}