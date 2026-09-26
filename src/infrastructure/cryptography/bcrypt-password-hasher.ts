import { hash } from "bcryptjs";
import { PasswordHasher } from "@/application/contracts/password-hasher.js";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly saltRounds = 8) {}

  hash(plain: string): Promise<string> {
    return hash(plain, this.saltRounds)
  }
}