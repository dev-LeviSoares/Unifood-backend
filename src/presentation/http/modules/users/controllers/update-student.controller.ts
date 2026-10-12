import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { uuidSchema } from "../../shared/schema/get-uuid.schema.js";
import { UpdateStudentProfile } from "@/application/use-cases/user/update-student.js";
import { updateStudentSchema } from "../schemas/update-student.schema.js";

export class UpdateStudentController implements HttpController {
  constructor(private readonly updateStudentProfile: UpdateStudentProfile) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const params = uuidSchema.safeParse(request.params);
    const body = updateStudentSchema.safeParse(request.body);

    if (!params.success || !body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: !params.success ? params.error : body.error
        },
      }
    }

    const user = await this.updateStudentProfile.execute(
      params.data?.id, 
      body.data,
      request.user?.sub || "",
      request.user?.role || ""
    );

    return { 
      status: 201, 
      body: user
    };
  }
}
