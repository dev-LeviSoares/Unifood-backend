import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const deletePixKey: RouteSchema = {
  tags: ["Seller"],
  summary: "Deletar chave PIX do seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    201: { type: "object" },
  },
}