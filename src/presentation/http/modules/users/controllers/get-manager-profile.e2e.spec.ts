import { createHttpServer } from "@/app.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { hash } from "bcryptjs";

describe("GET /manager/profile/:id", () => {
  it("should return the manager profile", async () => {
    const http = await createHttpServer();

    const managerPasswordHash = await hash("senha1234", 8);
    const manager = await prisma.user.create({
      data: {
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_manager",
        passwordHash: managerPasswordHash,
        telephone: "11999999999",
        birthDate: new Date("1999-01-01"),
        cpf: "52998224725",
        role: "MANAGER",
        status: "ACTIVE",
      },
    });

    const loginResponse = await http.inject({
      method: "POST",
      path: "/auth/login/manager",
      payload: {
        cpf: "52998224725",
        password: "senha1234",
      },
    });

    const { accessToken } = loginResponse.body as { accessToken: string };

    const response = await http.inject({
      method: "GET",
      path: `/manager/profile/${manager.id}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      fullName: "Joao Pedro",
      username: "joao_manager",
      cpf: "52998224725",
      phone: "11999999999",
      status: "ACTIVE",
      birthDate: "1999-01-01",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});