import { Encrypter } from "@/application/contracts/encrypter.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export class JwtAdapter implements Encrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: SignOptions["expiresIn"],
  ) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, this.secret) as Record<string, unknown>;
  }
}