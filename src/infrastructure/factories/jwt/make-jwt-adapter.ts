import { JwtAdapter } from "@/infrastructure/cryptography/jwt-adapter.js";
import { env } from "@/infrastructure/env/index.js";
import { SignOptions } from "jsonwebtoken";

export function makeJwtAdapter() {
  return new JwtAdapter(
    env.JWT_SECRET, 
    env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  );
}
