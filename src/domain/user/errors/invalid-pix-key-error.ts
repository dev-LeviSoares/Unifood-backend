import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidPixKeyError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
