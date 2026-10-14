import { JwtEncrypt } from "@/infrastructure/auth/jwt-encrypt.js";
import { env } from "@/infrastructure/env/index.js";
import { SignOptions } from "jsonwebtoken";

export function makeJwtAdapter() {
  return new JwtEncrypt(
    env.JWT_SECRET, 
    env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  );
}
