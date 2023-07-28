import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { Contact } from "../../entities/Contact.entity";
import {
  TContactRequest,
  TContactResponse,
} from "../../interfaces/contact.interface";
import { contactSchemaResponse } from "../../schemas/contact.schema";

const createContactService = async (
  payload: TContactRequest,
  client: Client
): Promise<TContactResponse> => {
  const repoContact: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Contact = repoContact.create({ ...payload, client: client });
  await repoContact.save(contact);

  return contactSchemaResponse.parse(contact);
};

export default createContactService;
