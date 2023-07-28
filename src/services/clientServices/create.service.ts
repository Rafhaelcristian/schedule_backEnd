import "dotenv/config";
import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../error";
import {
  TClientRequest,
  TClientResponse,
} from "../../interfaces/client.interface";
import { clientSchemaResponse } from "../../schemas/client.schema";

const createClientService = async (
  payload: TClientRequest
): Promise<TClientResponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);

  const hashPassword = await hash(payload.password, 10);

  const client: Client = await repo.create({
    ...payload,
    password: hashPassword,
  });
  await repo.save(client);

  return clientSchemaResponse.parse(client);
};

export default createClientService;
