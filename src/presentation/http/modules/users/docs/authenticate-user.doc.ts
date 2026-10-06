import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const authenticateUserDoc: RouteSchema = {
  tags: ["Auth"],
  summary: "Autenticar usuário",
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
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