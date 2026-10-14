import { createHttpServer } from "@/app.js";

describe("PUT /seller/pix-key/:id", () => {
  it("should return the updated seller profile", async () => {
    const http = await createHttpServer();

    const registered = await http.inject({
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
        pixKey: null,
      },
    });

    const { id } = registered.body as { id: string };

    // Fazer login para obter token
    const loginResponse = await http.inject({
      method: "POST",
      path: "/auth/login",
      payload: {
        username: "joao_pedro",
        password: "senha1234",
      },
    });

    const { accessToken } = loginResponse.body as { accessToken: string };

    const response = await http.inject({
      method: "PUT",
      path: `/seller/pix-key/${id}`,
      payload: {
        pix: "joao.pedro@email.com"
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      pix: "joao.pedro@email.com",
    });
  });
});