import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const authenticateManagerDoc: RouteSchema = {
  tags: ["Auth"],
  summary: "Autenticar manager",
  body: {
    type: "object",
    required: ["cpf", "password"],
    properties: {
      cpf: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        accessToken: { type: "string" },
      },
    },
  },
};