import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { RegisterPixKeySeller } from "@/application/use-cases/user/register-pix-seller.js";
import { pixSchema } from "../schemas/pix-schema.js";


export class RegisterPixController implements HttpController {
  constructor(private readonly registerPixSeller: RegisterPixKeySeller) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = uuidSchema.safeParse(request.params);
    const body = pixSchema.safeParse(request.body);

    if (!params.success || !body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: !params.success ? params.error : body.error
        },
      }
    }

    const pix = await this.registerPixSeller.execute(
      params.data?.id,
      body.data.pix,
      request.user?.sub,
      request.user?.role
    );

    return { 
      status: 201, 
      body: { pix }
    };
  }
}
