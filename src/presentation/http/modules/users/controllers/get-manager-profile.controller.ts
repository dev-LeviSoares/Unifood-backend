import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { GetManagerProfileUseCase } from "@/application/use-cases/user/get-manager-profile.js";

export class GetManagerProfileController implements HttpController {
  constructor(private readonly getStudentProfile: GetManagerProfileUseCase) {}

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

    const user = await this.getStudentProfile.execute(
      parsed.data?.id,
      request.user?.sub,
      request.user?.role
    );

    return { 
      status: 200, 
      body: user
    };
  }
}
