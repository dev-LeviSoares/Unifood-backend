import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const updateManagerProfileDoc: RouteSchema = {
  tags: ["Manager"],
  summary: "Atualizar perfil do manager",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    properties: {
      firstName: { type: "string", nullable: true },
      lastName: { type: "string", nullable: true },
      username: { type: "string", nullable: true },
      phone: { type: "string", nullable: true },
      birthDate: { type: "string", nullable: true },
    },
  },
  response: {
    201: { type: "object", additionalProperties: true },
  },
};
