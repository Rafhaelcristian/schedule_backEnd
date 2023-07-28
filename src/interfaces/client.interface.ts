import { z } from "zod";
import {
  allClientSchema,
  clientContactsSchemaResponse,
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
type TClientContactsResponse = z.infer<typeof clientContactsSchemaResponse>;

export {
  TClient,
  TClientRequest,
  TClientResponse,
  TUpdateClientRequest,
  TClientsReponse,
  TClientContactsResponse,
};
