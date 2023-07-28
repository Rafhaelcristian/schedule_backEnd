import { z } from "zod";

const clientSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  telephone: z.string(),
  createdAt: z.string(),
});

const clientSchemaRequest = clientSchema.omit({
  id: true,
  createdAt: true,
});

const clientSchemaResponse = clientSchema.omit({
  password: true,
});

const updateClientSchemaRequest = clientSchemaRequest.partial();

const allClientSchema = z.array(clientSchemaResponse);

export {
  clientSchema,
  clientSchemaRequest,
  clientSchemaResponse,
  updateClientSchemaRequest,
  allClientSchema,
};
