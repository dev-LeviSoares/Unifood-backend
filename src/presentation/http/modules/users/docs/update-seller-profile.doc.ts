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
      firstName: { type: "string", nullable: true },
      lastName: { type: "string", nullable: true },
      username: { type: "string", nullable: true },
      phone: { type: "string", nullable: true },
      birthDate: { type: "string", nullable: true },
      companyName: { type: "string", nullable: true },
      photoKey: { type: "string", nullable: true },
    },
  },
  response: {
    201: { type: "object", additionalProperties: true },
  },
}