import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: Response, error: Error) => {
  let statusCode: number;

  switch (error.message) {
    case "Bad Request!":
      statusCode = 400;
      break;
    case "Unauthorized!":
      statusCode = 401;
      break;
    case "Invalid Credentials!":
      statusCode = 401;
      break;
    case "Forbidden!":
      statusCode = 403;
      break;
    case "Not Found!":
      statusCode = 404;
      break;
    default:
      statusCode = 500;
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message,
    errors: error,
  });
};
