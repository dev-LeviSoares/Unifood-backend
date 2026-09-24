import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidPhoneError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}