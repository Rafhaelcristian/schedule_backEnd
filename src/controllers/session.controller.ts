import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/login.interface";
import { loginService } from "../services/session.service";

const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginRequest = req.body;

  const token = await loginService(loginData);

  return res.json({ token });
};

export { loginUserController };
