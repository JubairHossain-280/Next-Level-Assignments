import { UserModel } from "../../src/types/index.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
