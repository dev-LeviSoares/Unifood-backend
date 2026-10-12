import { createHttpServer } from "@/app.js";

describe("PATCH /student/profile/:id", () => {
  it("should return the updated student profile", async () => {
    const http = await createHttpServer();

    const registered = await http.inject({
      method: "POST",
      path: "/auth/register/student",
      payload: {
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "senha1234",
        phone: "11999999999",
        birthDate: "1999-01-01",
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
      method: "PATCH",
      path: `/student/profile/${id}`,
      payload: {
        username: "JP1"
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      firstName: "Joao",
      lastName: "Pedro",
      username: "jp1",
      cpf: null,
      phone: "11999999999",
      companyName: null,
      photoKey: null,
      pixKey: null,
      status: "ACTIVE",
      birthDate: "1999-01-01",
    });
  });
});