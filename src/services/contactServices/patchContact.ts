import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/Contact.entity";
import { AppError } from "../../error";
import { TUpdateContactRequest } from "../../interfaces/contact.interface";

const updateContactService = async (
  payload: TUpdateContactRequest,
  contactId: number
): Promise<Contact> => {
  const repo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const oldContact: Contact | null = await repo.findOneBy({
    id: contactId,
  });

  if (!oldContact) throw new AppError("Contact not found", 404);

  const newContact: Contact = repo.create({ ...oldContact, ...payload });

  await repo.save(newContact);

  return newContact;
};

export default updateContactService;
