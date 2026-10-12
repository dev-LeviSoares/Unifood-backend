import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { UpdateManagerProfileUseCase } from "@/application/use-cases/user/update-manager.js";
import { updateManagerSchema } from "../schemas/update-manager.schema.js";

export class UpdateManagerController implements HttpController {
  constructor(private readonly updateManagerProfile: UpdateManagerProfileUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = uuidSchema.safeParse(request.params);
    const body = updateManagerSchema.safeParse(request.body);

    if (!params.success || !body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: !params.success ? params.error : body.error,
        },
      };
    }

    const user = await this.updateManagerProfile.execute(
      params.data?.id,
      body.data,
      request.user?.sub || "",
      request.user?.role || "",
    );

    return {
      status: 201,
      body: user,
    };
  }
}
