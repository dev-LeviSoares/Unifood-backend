import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const registerSellerPhotoDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Cadastrar ou atualizar foto do seller autenticado",
  body: {
    type: "object",
    required: ["photoKey"],
    properties: {
      photoKey: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        photoKey: { type: "string" },
      },
    },
  },
};
