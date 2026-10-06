import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { authenticateManagerSchema } from "../schemas/authenticate-manager.schema.js";
import { AuthenticateManagerUseCase } from "@/application/use-cases/user/authenticate-manager.js";

export class AuthenticateManagerController implements HttpController {
  constructor(private readonly authenticateUser: AuthenticateManagerUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = authenticateManagerSchema.safeParse(request.body);

    if (!body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: body.error
        },
      }
    }

    const accessToken = await this.authenticateUser.execute({
      cpf: body.data.cpf, 
      password: body.data.password
    });

    return { 
      status: 200, 
      body: { accessToken }
    };
  }
}
