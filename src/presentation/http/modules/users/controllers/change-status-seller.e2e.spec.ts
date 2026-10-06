import { createHttpServer } from "@/app.js";

describe("PATCH /seller/status/:id", () => {
  it("should return the status seller profile", async () => {
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
        pixKey: "joao.pedro@email.com",
      },
    });

    const { id } = registered.body as { id: string };

    const response = await http.inject({
      method: "PATCH",
      path: `/seller/status/${id}`,
      payload: {
        action: "APPROVE"
      }
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: "ACTIVE",
    });
  });
});