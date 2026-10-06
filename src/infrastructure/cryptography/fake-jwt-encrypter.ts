import { Encrypter } from "@/application/contracts/encrypter.js";

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    return JSON.parse(token);
  }
}