import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  readContactService,
  updateContactService,
} from "../services/contact.service";
import { Contact } from "../entities/Contact.entity";
import { Client } from "../entities";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = res.locals.sub;
  const Contact: Contact = await createContactService(req.body, client);
  return res.status(201).json(Contact);
};

export const readContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = res.locals.sub;
  const Contacts: Client | null = await readContactService(client);
  return res.json(Contacts);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId = +req.params.id;
  const client: Contact = await updateContactService(req.body, contactId);
  return res.json(client);
  return res.json();
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteContactService(+req.params.id);
  return res.status(201).json();
};
