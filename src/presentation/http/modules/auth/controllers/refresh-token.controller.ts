import {
  HttpController,
  HttpRequest,
  HttpResponse,
} from "@/application/contracts/http.js";
import { RefreshTokenUseCase } from "@/application/use-cases/auth/refresh-token.js";
import { refreshTokenSchema } from "../schemas/refresh-token.schema.js";

export class RefreshTokenController implements HttpController {
  constructor(private readonly refreshToken: RefreshTokenUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const body = refreshTokenSchema.safeParse(request.body);

    if (!body.success) {
      return {
        status: 400,
        body: {
          message: "Validation failed",
          errors: body.error,
        },
      };
    }

    const { accessToken, refreshToken } = await this.refreshToken.execute({
      refreshToken: body.data.refreshToken,
    });

    return {
      status: 200,
      body: { accessToken, refreshToken },
    };
  }
}
