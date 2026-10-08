import { HttpServer } from "@/application/contracts/http-server.js";
import { registerUserRoutes } from "./modules/users/user.routes.js";
import { registerAuthRoutes } from "./modules/auth/auth.routes.js";
import { makeRegisterStudentController } from "@/infrastructure/factories/users/make-register-student-controller.js";
import { makeRegisterSellerController } from "@/infrastructure/factories/users/make-register-seller-controller.js";
import { makeGetSellerProfileController } from "@/infrastructure/factories/users/make-get-seller-profile.js";
import { makeUpdateSellerProfileController } from "@/infrastructure/factories/users/make-update-seller-profile.js";
import { makeRegisterPixController } from "@/infrastructure/factories/users/make-register-pix.js";
import { makeGetKeyPixController } from "@/infrastructure/factories/users/make-get-pix.js";
import { makeDeleteKeyPixController } from "@/infrastructure/factories/users/make-delete-pix.js";
import { makeChangeStatusSellerController } from "@/infrastructure/factories/users/make-change-status-seller.js";
import { makeAuthenticateUserController } from "@/infrastructure/factories/users/make-authenticate-user.js";
import { makeAuthenticateManagerController } from "@/infrastructure/factories/users/make-authenticate-manager.js";
import { makeRefreshTokenController } from "@/infrastructure/factories/auth/make-refresh-token.js";
import { makeGetStudentProfileController } from "@/infrastructure/factories/users/make-get-student-profile.js";

export function registerRoutes(http: HttpServer) {
  registerAuthRoutes(http, {
    refreshToken: makeRefreshTokenController(),
  });

  registerUserRoutes(http, {
    registerStudent: makeRegisterStudentController(),
    registerSeller: makeRegisterSellerController(),
    getSellerProfile: makeGetSellerProfileController(),
    getStudentProfile: makeGetStudentProfileController(),
    updateSellerProfile: makeUpdateSellerProfileController(),
    registerPix: makeRegisterPixController(),
    getPix: makeGetKeyPixController(),
    deletePix: makeDeleteKeyPixController(),
    changeStatusSeller: makeChangeStatusSellerController(),
    authenticateUser: makeAuthenticateUserController(),
    authenticateManager: makeAuthenticateManagerController(),
  });
}
