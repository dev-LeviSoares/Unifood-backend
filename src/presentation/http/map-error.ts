import { DomainError } from "@/domain/shared/domain-error.js";
import { CpfAlreadyTakenError } from "@/domain/user/errors/cpf-alerady-taken-error.js";
import { UsernameAlreadyTakenError } from "@/domain/user/errors/username-alerady-taken-error.js";
import type { HttpResponse } from "@/application/contracts/http.js";

export function mapDomainError(error: unknown): HttpResponse {
  if (error instanceof UsernameAlreadyTakenError || error instanceof CpfAlreadyTakenError) {
    return { status: 409, body: { message: error.message } };
  }

  if (error instanceof DomainError) {
    return { status: 400, body: { message: error.message } };
  }

  return { status: 500, body: { message: "Internal server error" } };
}