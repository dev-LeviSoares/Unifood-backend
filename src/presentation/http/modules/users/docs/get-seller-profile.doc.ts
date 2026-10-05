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
    201: { 
      type: "object", 
      properties: {
        fullName: { type: "string" },
        username: { type: "string" },
        cpf: { type: "string" },
        phone: { type: "string" },
        companyName: { type: "string" },
        photoKey: { type: "string", nullable: true },
        status: { type: "string" },
        birthDate: { type: "string" },
        pixKey: { type: "string", nullable: true },
        
      },
    },
  },
}