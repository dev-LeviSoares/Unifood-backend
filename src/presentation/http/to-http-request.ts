import { HttpRequest } from "@/application/contracts/http.js";

export function toHttpRequest(request: {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: unknown;
}): HttpRequest {
  return {
    body: request.body,
    params: request.params as Record<string, string>,
    query: request.query as Record<string, string>,
    headers: request.headers as HttpRequest["headers"],
  };
}
