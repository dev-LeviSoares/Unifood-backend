import { Decrypter } from "@/application/contracts/auth/decrypter.js";

export class FakeDecrypter implements Decrypter {
  async decrypt(token: string) {
    const payload = JSON.parse(token) as {
      sub: string;
      role?: string;
      name?: string;
    };

    return {
      sub: payload.sub,
      role: payload.role,
      name: payload.name,
    };
  }
}
