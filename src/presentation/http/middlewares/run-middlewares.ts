import { HttpMiddleware } from "@/application/contracts/http-middleware.js";
import { HttpRequest, HttpResponse } from "@/application/contracts/http.js";

export function isHttpResponse(
  value: HttpRequest | HttpResponse,
): value is HttpResponse {
  return "status" in value && !("params" in value);
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
