import { z } from "zod";
import {
  allClientSchema,
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
} from "../schemas/client.schema";
import { DeepPartial } from "typeorm";

type TClient = z.infer<typeof clientSchema>;
type TClientRequest = z.infer<typeof clientSchemaRequest>;
type TClientResponse = z.infer<typeof clientSchemaResponse>;
type TUpdateClientRequest = DeepPartial<TClientRequest>;
type TClientsReponse = z.infer<typeof allClientSchema>;

export {
  TClient,
  TClientRequest,
  TClientResponse,
  TUpdateClientRequest,
  TClientsReponse,
};
