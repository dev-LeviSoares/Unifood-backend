import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { DeleteSellerPhotoUseCase } from "@/application/use-cases/user/delete-photo-seller.js";

export class DeleteSellerPhotoController implements HttpController {
  constructor(private readonly deleteSellerPhoto: DeleteSellerPhotoUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.deleteSellerPhoto.execute(request.user?.sub || "");

    return {
      status: 204,
      body: null,
    };
  }
}
