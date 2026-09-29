import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const registerPixDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Registrar chave PIX do seller",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    required: ["pix"],
    properties: {
      pix: { type: "string", minLength: 1 },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        pixKey: { type: "string" },
      },
    },
  },
}