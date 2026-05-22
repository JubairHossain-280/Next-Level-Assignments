import { Request, Response } from "express";
import { issuesService } from "./issues.service.js";
import { UserModel } from "../../types/index.js";
import { errorResponse, sendResponse } from "../../utils/response.js";
import { QueryParams } from "./issues.interface.js";

const createIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as UserModel;

    const result = await issuesService.createIssuesIntoDB(req.body, id);

    sendResponse(res, 201, "Issue created successfully", result);
  } catch (error) {
    errorResponse(res, error as Error);
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDB(
      req.query as QueryParams,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    errorResponse(res, error as Error);
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
  } catch (error) {
    errorResponse(res, error as Error);
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

    sendResponse(res, 200, "Issue updated successfully", result);
  } catch (error) {
    errorResponse(res, error as Error);
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
  } catch (error) {
    errorResponse(res, error as Error);
  }
};

export const issuesController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  updateIssues,
  deleteIssues,
};
