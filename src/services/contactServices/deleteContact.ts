import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact.entity";
import { AppError } from "../../error";

const deleteContactService = async (clientId: number): Promise<void> => {
  const repo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await repo.findOneBy({
    id: clientId,
  });
  if (!contact) throw new AppError("Contact not found", 404);

  await repo.remove(contact!);
};

export default deleteContactService;
