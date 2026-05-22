import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import { UserModel } from "../types/index.js";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
          data: null,
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret as jwt.Secret,
      ) as UserModel;

      const user = await pool.query(
        `
        SELECT 1 FROM users
        WHERE id = $1
    `,
        [decoded.id],
      );

      if (user.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
          data: null,
        });
      }

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access!",
          data: null,
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
