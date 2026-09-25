import type { HttpController } from "./http.js";

export interface HttpServer {
  on(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    controller: HttpController,
  ): void;
  listen(port: number): Promise<void>;
}
