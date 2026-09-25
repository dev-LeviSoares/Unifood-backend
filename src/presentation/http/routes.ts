import { HttpServer } from "@/application/ports/http-server.js";
import { registerUserRoutes } from "./modules/users/user.routes.js";
import { makeRegisterStudentController } from "@/infrastructure/factories/users/make-register-student-controller.js";
import { makeRegisterSellerController } from "@/infrastructure/factories/users/make-register-seller-controller.js";

export function registerRoutes(http: HttpServer) {
  registerUserRoutes(http, {
    registerStudent: makeRegisterStudentController(),
    registerSeller: makeRegisterSellerController(),
  });
}