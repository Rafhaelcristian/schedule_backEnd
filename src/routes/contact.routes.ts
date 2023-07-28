import { Router } from "express";
import { createContactController } from "../controllers/contact.controller";
import {
  deleteClientController,
  readClientController,
  updateClientController,
} from "../controllers/client.controller";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import {
  contactSchemaRequest,
  updateContactSchemaRequest,
} from "../schemas/contact.schema";

const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(contactSchemaRequest),
  createContactController
);
contactRoutes.get("", ensureTokenIsValidMiddleware, readClientController);
contactRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(updateContactSchemaRequest),
  updateClientController
);
contactRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  deleteClientController
);

export default contactRoutes;
