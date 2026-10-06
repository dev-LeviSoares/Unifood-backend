import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { GetPixKeyUseCase } from "@/application/use-cases/user/get-pix.js";

export class GetPixKeyController implements HttpController {
  constructor(private readonly getPixSeller: GetPixKeyUseCase) {}

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

    const pix = await this.getPixSeller.execute(parsed.data?.id);

    return { 
      status: 200, 
      body: { pix }
    };
  }
}
