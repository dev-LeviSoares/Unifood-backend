import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { AuthenticateUserUseCase } from "@/application/use-cases/user/authenticate-user.js";
import { authenticateUserSchema } from "../schemas/authenticate-user.schema.js";

export class AuthenticateUserController implements HttpController {
  constructor(private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = authenticateUserSchema.safeParse(request.body);

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
      username: body.data.username, 
      password: body.data.password
    });

    return { 
      status: 200, 
      body: { accessToken }
    };
  }
}
