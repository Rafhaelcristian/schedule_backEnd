import { z } from "zod";
import {
  allContactSchema,
  contactSchema,
  contactSchemaRequest,
} from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TUpdateContactRequest = DeepPartial<TContactRequest>;
type TContactsResponse = z.infer<typeof allContactSchema>;

export { TContact, TContactRequest, TUpdateContactRequest, TContactsResponse };
