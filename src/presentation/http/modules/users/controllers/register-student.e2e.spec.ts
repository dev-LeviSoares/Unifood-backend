import { createHttpServer } from "@/app.js"

describe("POST /auth/register/student", () => {
  it("should register a student", async () => {
    const http = createHttpServer();

    const response = await http.inject({
      method: "POST",
      path: "/auth/register/student",
      payload: {
        firstName: "Joao",
        lastName: "Pedro",
        username: "joao_pedro",
        password: "senha1234",
        phone: "11999999999",
        birthDate: "1999-01-01"
      },
    });

    console.log(response)

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
      username: "joao_pedro",
      role: "STUDENT",
      status: "ACTIVE"
      }),
    )
  });
})