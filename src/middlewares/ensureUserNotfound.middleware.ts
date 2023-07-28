import { NextFunction, Request, Response } from "express";
import { Client } from "../entities";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { AppError } from "../error";

const ensureUserNotfound = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const userId: number = res.locals.sub;

  const user: Client | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) throw new AppError("User not found", 404);

  res.locals.user = user;

  return next();
};

export default ensureUserNotfound;
