import { HttpMiddleware } from "@/application/contracts/http-middleware.js";
import { HttpRequest, HttpResponse } from "@/application/contracts/http.js";

// Tem status e nao tem params, então é response
export function isHttpResponse(
  value: HttpRequest | HttpResponse,
): value is HttpResponse {
  return "status" in value && !("params" in value);
  // Operador "in" verifica se uma propriedade existe em um objeto.
}

export async function runMiddlewares(
  request: HttpRequest,
  middlewares: HttpMiddleware[] = [],
): Promise<HttpRequest | HttpResponse> {
  let current = request;

  for (const middleware of middlewares) {
    const result = await middleware.handle(current);

    if (isHttpResponse(result)) {
      return result;
    }

    current = result;
  }

  return current;
}
