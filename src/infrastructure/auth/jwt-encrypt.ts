import { Decrypter } from "@/application/contracts/auth/decrypter.js";
import { Encrypter } from "@/application/contracts/auth/encrypter.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export class JwtEncrypt implements Encrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: SignOptions["expiresIn"],
  ) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }
}