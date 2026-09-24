import { DomainError } from "@/domain/shared/domain-error.js";

export class InvalidPhotoError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
