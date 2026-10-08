import { createHttpServer } from "@/app.js";

describe("GET /student/me/:id", () => {
  it("should return the student profile", async () => {
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
      method: "GET",
      path: `/student/me/${id}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      fullName: "Joao Pedro",
      username: "joao_pedro",
      phone: "11999999999",
      status: "ACTIVE",
      birthDate: "1999-01-01",
    });
  });
});