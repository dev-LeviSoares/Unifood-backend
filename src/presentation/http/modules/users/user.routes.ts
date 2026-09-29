import { HttpServer } from "@/application/contracts/http-server.js";
import { HttpController } from "@/application/contracts/http.js";

interface UserControllers {
  registerStudent: HttpController;
  registerSeller: HttpController;
  getSellerProfile: HttpController;
  updateSellerProfile: HttpController;
  registerPix: HttpController;
}

export function registerUserRoutes(http: HttpServer, controllers: UserControllers) {
  http.on("POST", "/auth/register/student", controllers.registerStudent);
  http.on("POST", "/auth/register/seller", controllers.registerSeller);
  http.on("GET", "/seller/profile/:id", controllers.getSellerProfile);
  http.on("PATCH", "/seller/profile/:id", controllers.updateSellerProfile);
  http.on("PUT", "/seller/pix-key/:id", controllers.registerPix);
}