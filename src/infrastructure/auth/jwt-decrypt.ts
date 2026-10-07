import { Decrypter } from "@/application/contracts/auth/decrypter.js";
import jwt, { type SignOptions } from "jsonwebtoken";

export class JwtDecrypt implements Decrypter {
  constructor(
    private readonly secret: string,
  ) {}

  async decrypt(token: string) {
    const payload = jwt.verify(
      token, this.secret
    ) as {
      sub: string;
      role: "STUDENT" | "SELLER" | "MANAGER";
      name: string;
    };

    return {
      sub: payload.sub,
      role: payload.role,
      name: payload.name
    }
  }
}