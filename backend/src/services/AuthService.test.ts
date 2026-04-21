import { AuthService } from "./AuthService";

describe("AuthService.signup", () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it("returns ok for a valid signup", async () => {
    const result = await service.signup("user@example.com", "password123", "password123");
    expect(result.ok).toBe(true);
  });

  it("returns error for an invalid email", async () => {
    const result = await service.signup("not-an-email", "password123", "password123");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/email/i);
  });

  it("returns error when password is too short", async () => {
    const result = await service.signup("user@example.com", "short", "short");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/password/i);
  });

  it("returns error when confirm password does not match", async () => {
    const result = await service.signup("user@example.com", "password123", "different99");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/match/i);
  });

  it("returns error for a duplicate email", async () => {
    await service.signup("user@example.com", "password123", "password123");
    const result = await service.signup("user@example.com", "password123", "password123");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/email/i);
  });
});
