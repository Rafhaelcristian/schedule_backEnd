import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from "../../entities";
import { TLoginRequest } from "../../interfaces/login.interface";

export const loginService = async (payload: TLoginRequest): Promise<string> => {
  const userRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await userRepository.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!client) throw new AppError("Invalid credentials", 401);

  const confirmPassword = await compare(payload.password, client.password);

  if (!confirmPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign({}, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
    subject: String(client.id),
  });

  return token;
};
