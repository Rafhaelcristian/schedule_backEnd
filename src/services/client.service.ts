import { Repository } from "typeorm";
import { Client } from "../entities";
import { AppDataSource } from "../data-source";

export const createClientService = async (payload: any): Promise<Client> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client = await repo.save(payload);

  return client;
};

export const readClientService = async (): Promise<Client[]> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const clients: Client[] = await repo.find();

  return clients;
};

export const updateClientService = async (payload: any): Promise<Client> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client = await repo.save(payload);

  return client;
};

export const deleteClientService = async (payload: any): Promise<Client> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client = await repo.save(payload);

  return client;
};
