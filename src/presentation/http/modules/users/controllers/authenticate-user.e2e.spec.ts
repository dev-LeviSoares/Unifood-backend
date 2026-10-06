import { createHttpServer } from "@/app.js";

describe("POST /auth/login/", () => {
  it("should return the access token of the user", async () => {
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

    const response = await http.inject({
      method: "POST",
      path: `/auth/login`,
      payload: {
        username: "joao_pedro",
        password: "senha1234"
      }
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });
});