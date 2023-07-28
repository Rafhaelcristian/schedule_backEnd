import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { TClientContactsResponse } from "../../interfaces/client.interface";
import { clientContactsSchemaResponse } from "../../schemas/client.schema";

const readContactService = async (
  clientId: number
): Promise<TClientContactsResponse | null> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);

  const clientContacts: Client | null = await repo.findOne({
    where: {
      id: clientId,
    },
    relations: {
      contact: true,
    },
  });
  return clientContactsSchemaResponse.parse(clientContacts);
};

export default readContactService;
