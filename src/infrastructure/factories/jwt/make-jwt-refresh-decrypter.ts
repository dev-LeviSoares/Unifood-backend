import { JwtDecrypt } from "@/infrastructure/auth/jwt-decrypt.js";
import { env } from "@/infrastructure/env/index.js";

export function makeJwtRefreshDecrypter() {
  return new JwtDecrypt(env.JWT_REFRESH_SECRET);
}