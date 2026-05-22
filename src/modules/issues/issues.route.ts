import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post(
  "/",
  auth("contributor", "maintainer"),
  issuesController.createIssues,
);

router.get("/", issuesController.getAllIssues);

router.get("/:id", issuesController.getSingleIssue);

router.patch(
  "/:id",
  auth("contributor", "maintainer"),
  issuesController.updateIssues,
);

router.delete("/:id", auth("maintainer"), issuesController.deleteIssues);

export const issuesRoute = router;
