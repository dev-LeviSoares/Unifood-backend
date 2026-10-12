import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const deleteStudentDoc: RouteSchema = {
  tags: ["Student"],
  summary: "Deletar student",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    204: { type: "null" },
  },
};
