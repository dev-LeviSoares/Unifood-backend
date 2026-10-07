import { JwtDecrypt } from "@/infrastructure/auth/jwt-decrypt.js";
import { env } from "@/infrastructure/env/index.js";
import { AuthMiddleware } from "@/presentation/http/middlewares/auth-middleware.js";

export function makeAuthMiddleware() {
  return new AuthMiddleware(new JwtDecrypt(env.JWT_SECRET));
}