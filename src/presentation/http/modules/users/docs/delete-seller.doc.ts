import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const deleteSellerDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Deletar seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    204: { type: "null" },
  },
};
