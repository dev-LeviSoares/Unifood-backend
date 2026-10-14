import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const getStudentProfile: RouteSchema = {
  tags: ["Student"],
  summary: "Buscar perfil do student",
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
      },
    },
  },
}