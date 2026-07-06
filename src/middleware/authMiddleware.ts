import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user_id?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      res.status(401).json({
        message: "Authorization token is missing",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      user_id: string;
    };

    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
