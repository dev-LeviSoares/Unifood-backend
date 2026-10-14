import { JwtEncrypt } from "@/infrastructure/auth/jwt-encrypt.js";
import { env } from "@/infrastructure/env/index.js";
import { SignOptions } from "jsonwebtoken";

export function makeJwtRefreshAdapter() {
  return new JwtEncrypt(
    env.JWT_REFRESH_SECRET,
    env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  );
}