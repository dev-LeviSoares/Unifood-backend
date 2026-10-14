import { createHttpServer } from "@/app.js";

describe("POST /seller/me/photo", () => {
  it("should register the authenticated seller photo", async () => {
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
        photoKey: null,
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
      method: "POST",
      path: "/seller/me/photo",
      payload: {
        photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
      },
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

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      photoKey: "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
    });
    expect((profile.body as { photoKey: string }).photoKey).toBe(
      "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png",
    );
  });
});
