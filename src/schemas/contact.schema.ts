import { z } from "zod";

const contactSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  second_email: z.string().email().max(45).optional().nullish(),
  telephone: z.string(),
  second_telephone: z.string().optional().nullish(),
  createdAt: z.string(),
  clientId: z.number(),
}); 

const contactSchemaRequest = contactSchema.omit({
  id: true,
  createdAt: true,
  clientId: true,
});

const contactSchemaResponse = contactSchema.omit({
  clientId: true,
});

const updateContactSchemaRequest = contactSchemaRequest.partial();

const allContactSchema = z.array(contactSchemaResponse);

export {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
  updateContactSchemaRequest,
  allContactSchema,
};
