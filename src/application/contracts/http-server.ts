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
  ): void;

  listen(port: number): Promise<void>;
  
  inject(input: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    payload?: Record<string, unknown>;
  }): Promise<HttpInjectResponse>;
}
