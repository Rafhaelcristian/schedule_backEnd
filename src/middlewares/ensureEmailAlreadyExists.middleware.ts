import { NextFunction, Request, Response } from "express";
import { Client } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureEmailAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  if (email) {
    const userRepository: Repository<Client> =
      AppDataSource.getRepository(Client);

    const user: Client | null = await userRepository.findOneBy({
      email: email,
    });

    if (user) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default ensureEmailAlreadyExistsMiddleware;
