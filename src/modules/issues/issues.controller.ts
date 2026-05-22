import { Request, Response } from "express";
import { issuesService } from "./issues.service.js";
import { UserModel } from "../../types/index.js";

const createIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as UserModel;

    const result = await issuesService.createIssuesIntoDB(req.body, id);

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

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issuesService.getSingleIssueFromDB(id as string);

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

const updateIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issuesService.updateIssueIntoDB(
      req.body,
      id as string,
      req.user as UserModel,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Issue not found!",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await issuesService.deleteIssueFromDB(id as string);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    const status = error.message === "Issue not found!" ? 404 : 500;

    res.status(status).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  updateIssues,
  deleteIssues,
};
