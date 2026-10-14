import type { RouteSchema } from "@/application/contracts/routeSchema.js";

export const refreshTokenDoc: RouteSchema = {
  tags: ["Auth"],
  summary: "Renovar access token com refresh token",
  body: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
  },
};
