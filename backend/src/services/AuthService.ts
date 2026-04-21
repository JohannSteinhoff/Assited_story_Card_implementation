import bcrypt from "bcrypt";

type SignupResult = { ok: boolean; error?: string };

interface User {
  email: string;
  passwordHash: string;
}

export class AuthService {
  private users: User[] = [];

  async signup(email: string, password: string, confirmPassword: string): Promise<SignupResult> {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: "Invalid email address" };
    }
    if (password.length < 8) {
      return { ok: false, error: "Password must be at least 8 characters" };
    }
    if (password !== confirmPassword) {
      return { ok: false, error: "Passwords do not match" };
    }
    if (this.users.some((u) => u.email === email)) {
      return { ok: false, error: "That email is already registered" };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    this.users.push({ email, passwordHash });
    return { ok: true };
  }
}
