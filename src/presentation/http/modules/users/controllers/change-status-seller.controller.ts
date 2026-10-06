import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { ChangeStatusSellerUseCase } from "@/application/use-cases/user/change-status-seller.js";
import { changeStatusSellerSchema } from "../schemas/change-status-seller.schema.js";

export class ChangeStatusSellerController implements HttpController {
  constructor(private readonly changeStatusSeller: ChangeStatusSellerUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = uuidSchema.safeParse(request.params);
    const body = changeStatusSellerSchema.safeParse(request.body);

    if (!params.success || !body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: !params.success ? params.error : body.error
        },
      }
    }

    const status = await this.changeStatusSeller.execute(params.data?.id, body.data );

    return { 
      status: 201, 
      body: status
    };
  }
}
