import { Router } from "express";
import {
  createClientController,
  readClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/client.controller";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import {
  clientSchemaRequest,
  updateClientSchemaRequest,
} from "../schemas/client.schema";
import ensureEmailAlreadyExistsMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureUserNotfound from "../middlewares/ensureUserNotfound.middleware";

const clientRoutes: Router = Router();

clientRoutes.post(
  "",
  ensureBodyIsValidMiddleware(clientSchemaRequest),
  ensureEmailAlreadyExistsMiddleware,
  createClientController
);
clientRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserNotfound,
  readClientController
);

clientRoutes.patch(
  "",
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(updateClientSchemaRequest),
  ensureUserNotfound,
  ensureEmailAlreadyExistsMiddleware,
  updateClientController
);
clientRoutes.delete(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserNotfound,
  deleteClientController
);

export default clientRoutes;
