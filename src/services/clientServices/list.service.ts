import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { TClientsReponse } from "../../interfaces/client.interface";
import { allClientSchema } from "../../schemas/client.schema";

const readClientService = async (): Promise<TClientsReponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const clients: Client[] = await repo.find();

  return allClientSchema.parse(clients);
};

export default readClientService;
