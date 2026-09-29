import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const registerSellerDoc: RouteSchema = {
  tags: ["Auth"],
  summary: "Registrar seller",
  body: {
    type: "object",
    required: [
      "firstName", "lastName", "username", "password",
      "phone", "birthDate", "cpf", "companyName",
    ],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      username: { type: "string" },
      password: { type: "string" },
      phone: { type: "string" },
      birthDate: { type: "string" },
      cpf: { type: "string" },
      companyName: { type: "string" },
      photoKey: { type: "string", nullable: true },
      pixKey: { type: "string", nullable: true },
    },
  },
  response: {
    201: { type: "object", additionalProperties: true },
  },
}