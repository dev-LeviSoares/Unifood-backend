import { HttpInjectResponse, HttpServer } from "@/application/contracts/http-server.js";
import { HttpController } from "@/application/contracts/http.js";
import Fastify, { type FastifyInstance } from "fastify";
import { mapDomainError } from "./map-error.js";
import { setupSwagger } from "./swagger/swagger.js";
import { RouteSchema } from "@/application/contracts/routeSchema.js";

export class FastifyHttpServer implements HttpServer {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = Fastify();
  }

  on(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    controller: HttpController,
    schema?: RouteSchema,
  ): void {
    this.app[method.toLowerCase() as "get" | "post" | "put" | "patch" | "delete"](
      path,
      { schema },
      async (request, reply) => {
        try {
          const response = await controller.handle({
            body: request.body,
            params: request.params as Record<string, string>,
            query: request.query as Record<string, string>,
            headers: request.headers,
          });
          
          return reply.status(response.status).send(response.body);
        } catch (error) {
          const mapped = mapDomainError(error);
          return reply.status(mapped.status).send(mapped.body);
        }
      }
    )
  }

  async listen(port: number): Promise<void> {
    const address = await this.app.listen({ port, host: "0.0.0.0" });
    console.log(`HTTP server running on ${address}`);
  }

  async inject(input: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    payload?: Record<string, unknown>;
  }): Promise<HttpInjectResponse> {
    const response = await this.app.inject({
      method: input.method,
      url: input.path,
      payload: input.payload,
    });
  
    return {
      status: response.statusCode,
      body: response.json(),
    };
  }

  async setupSwagger(): Promise<void> {
    await setupSwagger(this.app);
  }
}
