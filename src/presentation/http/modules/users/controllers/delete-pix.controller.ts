import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { DeletePixKeyUseCase } from "@/application/use-cases/user/delete-pix.js";

export class DeletePixKeyController implements HttpController {
  constructor(private readonly deletePixKeySeller: DeletePixKeyUseCase) {}

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

    await this.deletePixKeySeller.execute(
      parsed.data?.id,
      request.user?.sub,
      request.user?.role
    );

    return { 
      status: 201, 
      body: null,
    };
  }
}
