import { HttpMiddleware } from "@/application/contracts/http-middleware.js";
import { HttpRequest, HttpResponse } from "@/application/contracts/http.js";

export class RoleMiddleware implements HttpMiddleware {
  constructor(private readonly allowedRoles: string[]) {}

  async handle(request: HttpRequest): Promise<HttpRequest | HttpResponse> {
    if (!request.user) {
      return { status: 401, body: { message: "Não autenticado." } };
    }

    if (!this.allowedRoles.includes(request.user.role)) {
      return { status: 403, body: { message: "Acesso negado." } };
    }

    return request;
  }
}