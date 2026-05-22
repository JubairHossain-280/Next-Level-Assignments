import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route.js";
import { issuesRoute } from "./modules/issues/issues.route.js";

const app: Application = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("🚼 DevPulse");
});

// handles auth routes
app.use("/api/auth", authRoute);

// handles issue routes
app.use("/api/issues", issuesRoute);

export default app;
