import { Decrypter } from "@/application/contracts/auth/decrypter.js";
import { HttpMiddleware } from "@/application/contracts/http-middleware.js";
import { HttpRequest, HttpResponse } from "@/application/contracts/http.js";

export class AuthMiddleware implements HttpMiddleware {
  constructor(private readonly decrypter: Decrypter) {}

  async handle(request: HttpRequest): Promise<HttpRequest | HttpResponse> {
    const header = request.headers.authorization;

    if (!header || Array.isArray(header) || !header.startsWith("Bearer ")) {
      return { status: 401, body: { message: "Token não informado." } };
    }

    const token = header.slice("Bearer ".length);

    try {
      const user = await this.decrypter.decrypt(token);
      return { ...request, user };
    } catch {
      return { status: 401, body: { message: "Token inválido." } };
    }
  }
}