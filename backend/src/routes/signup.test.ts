import request from "supertest";
import { app } from "../app";

describe("POST /api/signup", () => {
  it("returns 201 on valid signup", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({ email: "user@example.com", password: "password123", confirmPassword: "password123" });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/success/i);
  });

  it("returns 400 on validation failure", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({ email: "not-an-email", password: "password123", confirmPassword: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it("returns 409 on duplicate email", async () => {
    await request(app)
      .post("/api/signup")
      .send({ email: "dupe@example.com", password: "password123", confirmPassword: "password123" });

    const res = await request(app)
      .post("/api/signup")
      .send({ email: "dupe@example.com", password: "password123", confirmPassword: "password123" });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/email/i);
  });
});
