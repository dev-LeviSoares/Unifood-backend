import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { UpdateSellerProfile } from "@/application/use-cases/user/update-seller.js";
import { updateSellerSchema } from "../schemas/update-seller.schema.js";


export class UpdateSellerController implements HttpController {
  constructor(private readonly getSellerProfile: UpdateSellerProfile) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = uuidSchema.safeParse(request.params);
    const body = updateSellerSchema.safeParse(request.body);

    if (!params.success || !body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: !params.success ? params.error : body.error
        },
      }
    }

    const user = await this.getSellerProfile.execute(params.data?.id, body.data );

    return { 
      status: 200, 
      body: user
    };
  }
}
