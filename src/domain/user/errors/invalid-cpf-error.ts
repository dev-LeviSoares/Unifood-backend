import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidCpfError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
