import { HttpServer } from "@/application/ports/http-server.js";
import { HttpController } from "@/application/ports/http.js";

interface UserControllers {
  registerStudent: HttpController;
  registerSeller: HttpController;
}

export function registerUserRoutes(http: HttpServer, controllers: UserControllers) {
  http.on("POST", "/auth/register/student", controllers.registerStudent);
  http.on("POST", "/auth/register/seller", controllers.registerSeller);
}