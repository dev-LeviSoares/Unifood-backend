import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/ports/http.js";
import { RegisterSellerUseCase } from "@/application/use-cases/user/register-seller.js";
import { registerSellerSchema } from "../schemas/register-seller.schema.js";

export class RegisterSellerController implements HttpController {
  constructor(private readonly registerStudent: RegisterSellerUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const parsed = registerSellerSchema.safeParse(request.body);

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
      cpf: parsed.data.cpf,
      companyName: parsed.data.companyName,
      photoKey: parsed.data.photoKey ?? null
    });

    return { 
      status: 201, 
      body: user 
    };
  }
}
