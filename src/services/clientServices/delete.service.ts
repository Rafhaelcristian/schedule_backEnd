import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../error";

const deleteClientService = async (clientId: number): Promise<void> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Client | null = await repo.findOneBy({
    id: clientId,
  });
  if (!client) throw new AppError("Client not found", 404);

  await repo.remove(client);
};

export default deleteClientService;
