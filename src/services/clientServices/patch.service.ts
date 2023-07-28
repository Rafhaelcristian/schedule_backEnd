import "dotenv/config";
import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import {
  TUpdateClientRequest,
  TClientResponse,
} from "../../interfaces/client.interface";
import { clientSchemaResponse } from "../../schemas/client.schema";

const updateClientService = async (
  payload: TUpdateClientRequest,
  clientId: number
): Promise<TClientResponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const oldClient: Client | null = await repo.findOneBy({
    id: clientId,
  });

  if (payload.password) {
    const hashPassword = await hash(payload.password, 10);
    const newPayload = { ...payload, password: hashPassword };
    const newClient: Client = repo.create({ ...oldClient, ...newPayload });
    await repo.save(newClient);
    return clientSchemaResponse.parse(newClient);
  }

  const newClient: Client = repo.create({ ...oldClient, ...payload });

  await repo.save(newClient);

  return clientSchemaResponse.parse(newClient);
};
export default updateClientService;
