import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { RegisterSellerPhotoUseCase } from "@/application/use-cases/user/register-photo-seller.js";
import { registerSellerPhotoSchema } from "../schemas/register-seller-photo.schema.js";

export class RegisterSellerPhotoController implements HttpController {
  constructor(private readonly registerSellerPhoto: RegisterSellerPhotoUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = registerSellerPhotoSchema.safeParse(request.body);

    if (!body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: body.error,
        },
      };
    }

    const photoKey = await this.registerSellerPhoto.execute(
      request.user?.sub || "",
      body.data.photoKey,
    );

    return {
      status: 201,
      body: { photoKey },
    };
  }
}
