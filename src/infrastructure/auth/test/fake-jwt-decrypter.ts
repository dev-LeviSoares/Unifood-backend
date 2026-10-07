import { Encrypter } from "@/application/contracts/auth/encrypter.js";

export class FakeDecrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}