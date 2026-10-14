import { HttpRequest, HttpResponse } from "./http.js";

export interface HttpMiddleware {
  handle(request: HttpRequest): Promise<HttpRequest | HttpResponse>;
}