import { createHttpServer } from "@/app.js";

describe("DELETE /seller/me/photo", () => {
  it("should delete the authenticated seller photo", async () => {
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
      method: "DELETE",
      path: "/seller/me/photo",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const profile = await http.inject({
      method: "GET",
      path: `/seller/profile/${id}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).toBe(204);
    expect((profile.body as { photoKey: string | null }).photoKey).toBeNull();
  });
});
