import { Router, Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export const signupRouter = Router();
const authService = new AuthService();

signupRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  const result = await authService.signup(email, password, confirmPassword);

  if (result.ok) {
    res.status(201).json({ message: "Signup successful" });
  } else if (result.error?.toLowerCase().includes("already")) {
    res.status(409).json({ error: result.error });
  } else {
    res.status(400).json({ error: result.error });
  }
});
