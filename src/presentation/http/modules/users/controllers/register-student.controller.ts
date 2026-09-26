import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/ports/http.js";
import { RegisterStudentUseCase } from "@/application/use-cases/user/register-student.js";
import { registerStudentSchema } from "../schemas/register-student.schema.js";

export class RegisterStudentController implements HttpController {
  constructor(private readonly registerStudent: RegisterStudentUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const parsed = registerStudentSchema.safeParse(request.body);

    if (!parsed.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: parsed.error
        }
      }
    }
    
    const user = await this.registerStudent.execute({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      username: parsed.data.username,
      password: parsed.data.password,
      phone: parsed.data.phone,
      birthDate: parsed.data.birthDate,
    });

    return { 
      status: 201, 
      body: user 
    };
  }
}
