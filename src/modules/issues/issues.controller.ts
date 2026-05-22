import { Request, Response } from "express";
import { issuesService } from "./issues.service.js";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.createIssuesIntoDB(
      req.body,
      req?.user?.id,
    );

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const sort = typeof req.query.sort === "string" ? req.query.sort : "newest";

    const type =
      typeof req.query.type === "string" ? req.query.type : undefined;

    const status =
      typeof req.query.status === "string" ? req.query.status : undefined;


    const result = await issuesService.getAllIssuesFromDB(sort, type, status);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
};
