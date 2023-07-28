import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  readContactController,
  updateContactController,
} from "../controllers/contact.controller";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import {
  contactSchemaRequest,
  updateContactSchemaRequest,
} from "../schemas/contact.schema";
import ensureUserNotfound from "../middlewares/ensureUserNotfound.middleware";
import ensureEmailAndTelAlreadyExistsMiddleware from "../middlewares/ensureEmailAndTelAlreadyExists.middleware";

const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(contactSchemaRequest),
  ensureEmailAndTelAlreadyExistsMiddleware,
  ensureUserNotfound,
  createContactController
);
contactRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserNotfound,
  readContactController
);
contactRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserNotfound,
  ensureBodyIsValidMiddleware(updateContactSchemaRequest),
  ensureEmailAndTelAlreadyExistsMiddleware,
  updateContactController
);
contactRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserNotfound,
  deleteContactController
);

export default contactRoutes;
