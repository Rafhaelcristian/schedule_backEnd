import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { Contact } from "../entities/Contact.entity";

const ensureEmailAndTelAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, second_email, telephone, second_telephone } = req.body;

  const contactRepo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contactAlreadyExists = await contactRepo
    .createQueryBuilder("c")
    .where("c.email = :email", { email: email })
    .orWhere("c.email = :email", { email: second_email })
    .orWhere("c.second_email = :second_email", { second_email: email })
    .orWhere("c.second_email = :second_email", { second_email: second_email })
    .orWhere("c.telephone = :telephone", { telephone: telephone })
    .orWhere("c.telephone = :telephone", { telephone: second_telephone })
    .orWhere("c.second_telephone = :second_telephone", {
      second_telephone: telephone,
    })
    .orWhere("c.second_telephone = :second_telephone", {
      second_telephone: second_telephone,
    })
    .getOne();

  console.log(contactAlreadyExists);

  if (contactAlreadyExists)
    throw new AppError("Email or telphone already exists", 409);

  return next();
};

export default ensureEmailAndTelAlreadyExistsMiddleware;
