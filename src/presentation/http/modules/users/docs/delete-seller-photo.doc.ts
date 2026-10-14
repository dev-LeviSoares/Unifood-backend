import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const deleteSellerPhotoDoc: RouteSchema = {
  tags: ["Seller"],
  summary: "Remover foto do seller autenticado",
  response: {
    204: { type: "null" },
  },
};
