import { createHttpServer } from "@/app.js";
import { prisma } from "@/infrastructure/database/prisma.js";
import { hash } from "bcryptjs";

describe("POST /auth/login/manager", () => {
  it("should return the access token of the manager", async () => {
    const http = await createHttpServer();

    const managerPasswordHash = await hash("senha1234", 8);
    await prisma.user.create({
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

    const response = await http.inject({
      method: "POST",
      path: `/auth/login/manager`,
      payload: {
        cpf: "52998224725",
        password: "senha1234",
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
  });
});
