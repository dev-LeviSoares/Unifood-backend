import { createHttpServer } from "@/app.js";
import { prisma } from "@/infrastructure/database/prisma.js";

describe("DELETE /student/profile/:id", () => {
  it("should hard delete the student", async () => {
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
      path: `/student/profile/${id}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const stored = await prisma.user.findUnique({ where: { id } });

    expect(response.status).toBe(204);
    expect(stored).toBeNull();
  });
});
