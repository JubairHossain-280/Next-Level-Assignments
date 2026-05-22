import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { errorResponse, sendResponse } from "../../utils/response.js";

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);

    sendResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    errorResponse(res, error as Error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    sendResponse(res, 200, "Login successful", result);
  } catch (error) {
    errorResponse(res, error as Error);
  }
};

export const authController = {
  registerNewUser,
  loginUser,
};
