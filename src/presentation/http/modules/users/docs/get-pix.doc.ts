import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const getPixKey: RouteSchema = {
  tags: ["Seller"],
  summary: "Buscar chave PIX do seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: { type: "object", additionalProperties: true },
  },
}