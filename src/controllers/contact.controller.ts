import { Request, Response } from "express";
import { Contact } from "../entities/Contact.entity";
import { TContactResponse } from "../interfaces/contact.interface";
import { TClientContactsResponse } from "../interfaces/client.interface";
import createContactService from "../services/contactServices/createContact";
import readContactService from "../services/contactServices/listContact";
import updateContactService from "../services/contactServices/patchContact";
import deleteContactService from "../services/contactServices/deleteContact";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = res.locals.sub;
  const Contact: TContactResponse = await createContactService(
    req.body,
    client
  );
  return res.status(201).json(Contact);
};

export const readContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = +res.locals.sub;
  const Contacts: TClientContactsResponse | null = await readContactService(
    client
  );
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
  return res.status(204).send();
};
