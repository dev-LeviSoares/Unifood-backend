import { createHttpServer } from "@/app.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { hash } from "bcryptjs";

describe("PATCH /manager/profile/:id", () => {
  it("should return the updated manager profile", async () => {
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
      method: "PATCH",
      path: `/manager/profile/${manager.id}`,
      payload: {
        username: "JP1",
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
      cpf: "529.982.247-25",
      phone: "11999999999",
      companyName: null,
      photoKey: null,
      pixKey: null,
      status: "ACTIVE",
      birthDate: "1999-01-01",
    });
  });
});
