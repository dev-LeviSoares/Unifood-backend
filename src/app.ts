import { FastifyHttpServer } from "./presentation/http/fastify-http-server.js";
import { registerRoutes } from "./presentation/http/routes.js";

export function createHttpServer() {
  const http = new FastifyHttpServer();

  registerRoutes(http);
  
  return http;
}