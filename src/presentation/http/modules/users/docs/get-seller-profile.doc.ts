import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const getSellerProfile: RouteSchema = {
  tags: ["Seller"],
  summary: "Buscar perfil do seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    201: { type: "object", additionalProperties: true },
  },
}