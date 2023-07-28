import "dotenv/config";
import { Client } from "../entities";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import {
  TClientRequest,
  TClientResponse,
  TClientsReponse,
  TUpdateClientRequest,
} from "../interfaces/client.interface";
import {
  allClientSchema,
  clientSchemaResponse,
} from "../schemas/client.schema";
import { AppError } from "../error";
import { hash } from "bcryptjs";

export const createClientService = async (
  payload: TClientRequest
): Promise<TClientResponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const findClient = await repo.findOne({
    where: {
      email: payload.email,
    },
  });
  if (findClient) throw new AppError("User already existss", 409);

  const hashPassword = await hash(payload.password, 10);

  const client: Client = await repo.create({
    ...payload,
    password: hashPassword,
  });
  await repo.save(client);

  return clientSchemaResponse.parse(client);
};

export const readClientService = async (): Promise<TClientsReponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const clients: Client[] = await repo.find();

  return allClientSchema.parse(clients);
};

export const updateClientService = async (
  payload: TUpdateClientRequest,
  clientId: number
): Promise<TClientResponse> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);

  const oldClient: Client | null = await repo.findOneBy({
    id: clientId,
  });

  const newClient: Client = repo.create({ ...oldClient, ...payload });

  await repo.save(newClient);

  return clientSchemaResponse.parse(newClient);
};

export const deleteClientService = async (clientId: number): Promise<void> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Client | null = await repo.findOneBy({
    id: clientId,
  });

  await repo.remove(client!);
};
