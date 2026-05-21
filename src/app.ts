import express, { Application, Request, Response } from "express";
import { authRoute } from "./module/auth/auth.route.js";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("🚼 DevPulse");
});

// handles auth routes
app.use("/api/auth", authRoute);

export default app;
