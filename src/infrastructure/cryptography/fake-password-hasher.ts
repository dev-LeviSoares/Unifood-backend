import { PasswordHasher } from "@/application/contracts/password-hasher.js";

export class FakePasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return `hashed-${plain}`;
  }
}