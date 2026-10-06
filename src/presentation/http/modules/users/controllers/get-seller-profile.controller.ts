import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { GetSellerProfileUseCase } from "@/application/use-cases/user/get-seller-profile.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";


export class GetSellerProfileController implements HttpController {
  constructor(private readonly getSellerProfile: GetSellerProfileUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const parsed = uuidSchema.safeParse(request.params);

    if (!parsed.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: parsed.error
        }
      }
    }

    const user = await this.getSellerProfile.execute(parsed.data?.id);

    return { 
      status: 200, 
      body: user
    };
  }
}
