import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const updateSellerProfileDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Atualizar perfil do seller",
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
      firstName: { type: "string" },
      lastName: { type: "string" },
      username: { type: "string" },
      phone: { type: "string" },
      birthDate: { type: "string" },
      companyName: { type: "string" },
      photoKey: { type: "string", nullable: true },
    },
  },
  response: {
    200: { type: "object", additionalProperties: true },
  },
}