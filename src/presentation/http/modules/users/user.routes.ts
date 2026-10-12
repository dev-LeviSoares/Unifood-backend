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
import { makeAuthMiddleware } from "@/infrastructure/factories/jwt/make-auth-middleware.js";
import { RoleMiddleware } from "../../middlewares/role-middleware.js";
import { HttpMiddleware } from "@/application/contracts/http-middleware.js";
import { getStudentProfile } from "./docs/get-student-profile.doc.js";
import { getManagerProfile } from "./docs/get-manager-profile.doc.js";
import { updateStudentProfileDoc } from "./docs/update-student-profile.doc.js";
import { updateManagerProfileDoc } from "./docs/update-manager-profile.doc.js";
import { deleteStudentDoc } from "./docs/delete-student.doc.js";
import { deleteSellerDoc } from "./docs/delete-seller.doc.js";

interface UserControllers {
  registerStudent: HttpController;
  registerSeller: HttpController;
  getSellerProfile: HttpController;
  getStudentProfile: HttpController
  getManagerProfile: HttpController
  updateSellerProfile: HttpController;
  updateStudentProfile: HttpController;
  updateManagerProfile: HttpController;
  deleteStudent: HttpController;
  deleteSeller: HttpController;
  registerPix: HttpController;
  getPix: HttpController;
  deletePix: HttpController;
  changeStatusSeller: HttpController;
  authenticateUser: HttpController;
  authenticateManager: HttpController;
}

function requireRoles(...roles: Array<"SELLER" | "MANAGER" | "STUDENT">): HttpMiddleware[] {
  return [makeAuthMiddleware(), new RoleMiddleware(roles)];
}

export function registerUserRoutes(
  http: HttpServer,
  controllers: UserControllers,
) {
  http.on(
    "POST",
    "/auth/register/student",
    controllers.registerStudent,
    registerStudentDoc,
  );

  http.on(
    "POST",
    "/auth/register/seller",
    controllers.registerSeller,
    registerSellerDoc,
  );

  http.on(
    "POST",
    "/auth/login",
    controllers.authenticateUser,
    authenticateUserDoc,
  );

  http.on(
    "POST",
    "/auth/login/manager",
    controllers.authenticateManager,
    authenticateManagerDoc,
  );

  http.on(
    "GET",
    "/seller/profile/:id",
    controllers.getSellerProfile,
    getSellerProfile,
    requireRoles("SELLER", "MANAGER"),
  );

  http.on(
    "GET",
    "/student/profile/:id",
    controllers.getStudentProfile,
    getStudentProfile,
    requireRoles("STUDENT", "MANAGER"),
  );

  http.on(
    "GET",
    "/manager/profile/:id",
    controllers.getManagerProfile,
    getManagerProfile,
    requireRoles("MANAGER"),
  );

  http.on(
    "PATCH",
    "/seller/profile/:id",
    controllers.updateSellerProfile,
    updateSellerProfileDoc,
    requireRoles("SELLER", "MANAGER"),
  );

  http.on(
    "PATCH",
    "/student/profile/:id",
    controllers.updateStudentProfile,
    updateStudentProfileDoc,
    requireRoles("STUDENT", "MANAGER"),
  );

  http.on(
    "PATCH",
    "/manager/profile/:id",
    controllers.updateManagerProfile,
    updateManagerProfileDoc,
    requireRoles("MANAGER"),
  );

  http.on(
    "DELETE",
    "/student/profile/:id",
    controllers.deleteStudent,
    deleteStudentDoc,
    requireRoles("STUDENT", "MANAGER"),
  );

  http.on(
    "DELETE",
    "/seller/profile/:id",
    controllers.deleteSeller,
    deleteSellerDoc,
    requireRoles("SELLER", "MANAGER"),
  );

  http.on(
    "PATCH",
    "/seller/status/:id",
    controllers.changeStatusSeller,
    changeStatusSellerDoc,
    requireRoles("MANAGER"),
  );

  http.on("GET", "/seller/pix-key/:id", controllers.getPix, getPixKey, requireRoles("SELLER", "MANAGER"));

  http.on(
    "PUT",
    "/seller/pix-key/:id",
    controllers.registerPix,
    registerPixDoc,
    requireRoles("SELLER", "MANAGER"),
  );

  http.on(
    "DELETE",
    "/seller/pix-key/:id",
    controllers.deletePix,
    deletePixKey,
    requireRoles("SELLER", "MANAGER"),
  );
}
