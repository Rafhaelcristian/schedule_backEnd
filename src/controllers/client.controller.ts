import { Request, Response } from "express";
import {
  TClientResponse,
  TClientsReponse,
} from "../interfaces/client.interface";
import createClientService from "../services/clientServices/create.service";
import readClientService from "../services/clientServices/list.service";
import updateClientService from "../services/clientServices/patch.service";
import deleteClientService from "../services/clientServices/delete.service";

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: TClientResponse = await createClientService(req.body);
  return res.status(201).json(client);
};

export const readClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: TClientsReponse = await readClientService();
  return res.json(clients);
};

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = +res.locals.sub;
  const client: TClientResponse = await updateClientService(req.body, clientId);
  return res.json(client);
};

export const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId: number = res.locals.sub;

  const deleteClient = await deleteClientService(clientId);

  return res.status(204).send();
};
