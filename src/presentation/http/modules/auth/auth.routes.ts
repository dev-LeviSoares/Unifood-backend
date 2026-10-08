import { HttpServer } from "@/application/contracts/http-server.js";
import { HttpController } from "@/application/contracts/http.js";
import { refreshTokenDoc } from "./docs/refresh-token.doc.js";

interface AuthControllers {
  refreshToken: HttpController;
}

export function registerAuthRoutes(
  http: HttpServer,
  controllers: AuthControllers,
) {
  http.on(
    "POST",
    "/auth/refresh",
    controllers.refreshToken,
    refreshTokenDoc,
  );
}
