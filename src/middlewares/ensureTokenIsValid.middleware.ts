import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token: string | undefined = req.headers.authorization;
  const userId: number = +req.params.id;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  if (token) token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.sub = decoded.sub;
    res.locals.admin = decoded.admin;
  });

  return next();
};

export default ensureTokenIsValidMiddleware;
