import express from "express";
import cors from "cors";
import { signupRouter } from "./routes/signup";

export const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", signupRouter);
