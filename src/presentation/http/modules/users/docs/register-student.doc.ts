import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const registerStudentDoc: RouteSchema = {
  tags: ["Auth"],
  summary: "Registrar estudante",
  body: {
    type: "object",
    required: ["firstName", "lastName", "username", "password", "phone", "birthDate"],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
      phone: { type: "string" },
      birthDate: { type: "string" },
    },
  },
  response: {
    201: { type: "object", additionalProperties: true },
  },
}