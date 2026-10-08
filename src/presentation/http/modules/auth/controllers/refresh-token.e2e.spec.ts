import { createHttpServer } from "@/app.js";

describe("POST /auth/refresh", () => {
  it("should return a new access and refresh token pair", async () => {
    const http = await createHttpServer();

    await http.inject({
      method: "POST",
      path: "/auth/register/seller",
      payload: {
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "senha1234",
        phone: "11999999999",
        birthDate: "1999-01-01",
        cpf: "11144477735",
        companyName: "company test",
        photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
        pixKey: "joao.pedro@email.com",
      },
    });

    const loginResponse = await http.inject({
      method: "POST",
      path: "/auth/login",
      payload: {
        username: "joao_pedro",
        password: "senha1234",
      },
    });

    const { refreshToken } = loginResponse.body as {
      accessToken: string;
      refreshToken: string;
    };

    const response = await http.inject({
      method: "POST",
      path: "/auth/refresh",
      payload: {
        refreshToken,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
    expect((response.body as { refreshToken: string }).refreshToken).not.toBe(
      refreshToken,
    );
  });
});
