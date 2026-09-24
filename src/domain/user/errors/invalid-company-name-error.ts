import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidCompanyNameError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
