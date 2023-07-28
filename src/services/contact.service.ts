import "dotenv/config";
import { Contact } from "../entities/Contact.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import {
  TContactRequest,
  TUpdateContactRequest,
} from "../interfaces/contact.interface";
import { Client } from "../entities";
import { AppError } from "../error";

export const createContactService = async (
  payload: TContactRequest,
  clientId: number
): Promise<Contact> => {
  const repoContact: Repository<Contact> = AppDataSource.getRepository(Contact);
  const repoClient: Repository<Client> = AppDataSource.getRepository(Client);
  const client: Client | null = await repoClient.findOne({
    where: {
      id: clientId,
    },
  });
  if (!client) throw new AppError("Client not found", 404);

  const contact: Contact = repoContact.create({ ...payload, client: client });
  await repoContact.save(contact);

  return contact;
};

export const readContactService = async (
  clientId: number
): Promise<Client | null> => {
  const repo: Repository<Client> = AppDataSource.getRepository(Client);
  const clientContacts: Client | null = await repo.findOne({
    where: {
      id: clientId,
    },
    relations: {
      contact: true,
    },
  });
  if (!clientContacts) throw new AppError("Client not found", 404);

  return clientContacts;
};

export const updateContactService = async (
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

export const deleteContactService = async (clientId: number): Promise<void> => {
  const repo: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await repo.findOneBy({
    id: clientId,
  });
  if (!contact) throw new AppError("Contact not found", 404);

  await repo.remove(contact!);
};
