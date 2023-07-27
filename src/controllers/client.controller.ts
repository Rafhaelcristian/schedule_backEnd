import { Request, Response } from "express";
import { Client } from "../entities";
import {
  createClientService,
  readClientService,
} from "../services/client.service";

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: Client = await createClientService(req.body);
  return res.status(201).json(client);
};

export const readClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: Client[] = await readClientService();
  return res.status(200).json(clients);
};

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(201).json();
};

export const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(201).json();
};
