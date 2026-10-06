import { FastifyHttpServer } from "./presentation/http/fastify-http-server.js";
import { registerRoutes } from "./presentation/http/routes.js";

export async function createHttpServer() {
  const http = new FastifyHttpServer();

  await http.setupSwagger()
  registerRoutes(http);
  
  return http;
}