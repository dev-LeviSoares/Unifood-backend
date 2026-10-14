import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const getManagerProfile: RouteSchema = {
  tags: ["Manager"],
  summary: "Buscar perfil do manager",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: { 
      type: "object", 
      properties: {
        fullName: { type: "string" },
        username: { type: "string" },
        phone: { type: "string" },
        status: { type: "string" },
        birthDate: { type: "string" },
        cpf: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
}