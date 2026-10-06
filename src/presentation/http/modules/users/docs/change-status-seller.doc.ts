import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const changeStatusSellerDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Alterar status do seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    required: ["action"],
    properties: {
      action: {
        type: "string",
        enum: ["APPROVE", "REJECT", "BLOCK", "REACTIVATE"],
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        status: { type: "string" },
      },
    },
  },
};