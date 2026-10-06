import { HttpServer } from "@/application/contracts/http-server.js";
import { HttpController } from "@/application/contracts/http.js";
import { registerPixDoc } from "./docs/register-pix.doc.js";
import { registerStudentDoc } from "./docs/register-student.doc.js";
import { registerSellerDoc } from "./docs/register-seller.doc.js";
import { getSellerProfile } from "./docs/get-seller-profile.doc.js";
import { updateSellerProfileDoc } from "./docs/update-seller-profile.doc.js";
import { getPixKey } from "./docs/get-pix.doc.js";
import { deletePixKey } from "./docs/delete-pix.doc.js";
import { changeStatusSellerDoc } from "./docs/change-status-seller.doc.js";
import { authenticateUserDoc } from "./docs/authenticate-user.doc.js";
import { authenticateManagerDoc } from "./docs/authenticate-manager.doc.js";

interface UserControllers {
  registerStudent: HttpController;
  registerSeller: HttpController;
  getSellerProfile: HttpController;
  updateSellerProfile: HttpController;
  registerPix: HttpController;
  getPix: HttpController;
  deletePix: HttpController;
  changeStatusSeller: HttpController;
  authenticateUser: HttpController;
  authenticateManager: HttpController;
}

export function registerUserRoutes(http: HttpServer, controllers: UserControllers) {
  http.on("POST", "/auth/register/student", controllers.registerStudent, registerStudentDoc);
  http.on("POST", "/auth/register/seller", controllers.registerSeller, registerSellerDoc);

  http.on("POST", "/auth/login", controllers.authenticateUser, authenticateUserDoc);
  http.on("POST", "/auth/login/manager", controllers.authenticateManager, authenticateManagerDoc);

  http.on("GET", "/seller/profile/:id", controllers.getSellerProfile, getSellerProfile);
  http.on("PATCH", "/seller/profile/:id", controllers.updateSellerProfile, updateSellerProfileDoc);
  http.on("PATCH", "/seller/status/:id", controllers.changeStatusSeller,changeStatusSellerDoc);
  
  http.on("GET", "/seller/pix-key/:id", controllers.getPix, getPixKey);
  http.on("PUT", "/seller/pix-key/:id", controllers.registerPix, registerPixDoc);
  http.on("DELETE", "/seller/pix-key/:id", controllers.deletePix, deletePixKey);
  
}