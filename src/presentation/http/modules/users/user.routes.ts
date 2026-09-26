import { HttpServer } from "@/application/contracts/http-server.js";
import { HttpController } from "@/application/contracts/http.js";

interface UserControllers {
  registerStudent: HttpController;
  registerSeller: HttpController;
}

export function registerUserRoutes(http: HttpServer, controllers: UserControllers) {
  http.on("POST", "/auth/register/student", controllers.registerStudent);
  http.on("POST", "/auth/register/seller", controllers.registerSeller);
}