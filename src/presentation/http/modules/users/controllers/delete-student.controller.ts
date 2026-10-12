import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { DeleteStudentUseCase } from "@/application/use-cases/user/delete-student.js";

export class DeleteStudentController implements HttpController {
  constructor(private readonly deleteStudent: DeleteStudentUseCase) {}

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

    await this.deleteStudent.execute(
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
