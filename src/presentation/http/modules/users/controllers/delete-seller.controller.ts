import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { DeleteSellerUseCase } from "@/application/use-cases/user/delete-seller.js";

export class DeleteSellerController implements HttpController {
  constructor(private readonly deleteSeller: DeleteSellerUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const parsed = uuidSchema.safeParse(request.params);

    if (!parsed.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: parsed.error,
        },
      };
    }

    await this.deleteSeller.execute(
      parsed.data?.id,
      request.user?.sub || "",
      request.user?.role || "",
    );

    return {
      status: 204,
      body: null,
    };
  }
}
