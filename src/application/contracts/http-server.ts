import { HttpMiddleware } from "./http-middleware.js";
import type { HttpController } from "./http.js";
import { RouteSchema } from "./routeSchema.js";

export interface HttpInjectResponse {
  status: number;
  body: unknown;
}

export interface HttpServer {
  on(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    controller: HttpController,
    schema?: RouteSchema,
    middlewares?: HttpMiddleware[],
  ): void;

  listen(port: number): Promise<void>;
  
  inject(input: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    payload?: Record<string, unknown>;
    headers?: Record<string, string>;
  }): Promise<HttpInjectResponse>;
}
