import { z } from "zod";
import {
  allContactSchema,
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
} from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TUpdateContactRequest = DeepPartial<TContactRequest>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;
type TContactsResponse = z.infer<typeof allContactSchema>;

export {
  TContact,
  TContactRequest,
  TUpdateContactRequest,
  TContactResponse,
  TContactsResponse,
};
