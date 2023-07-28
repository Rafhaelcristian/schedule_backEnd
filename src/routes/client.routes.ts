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

const clientRoutes: Router = Router();

clientRoutes.post(
  "",
  ensureBodyIsValidMiddleware(clientSchemaRequest),
  createClientController
);
clientRoutes.get("", ensureTokenIsValidMiddleware, readClientController);
clientRoutes.patch(
  "",
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(updateClientSchemaRequest),
  updateClientController
);
clientRoutes.delete("", ensureTokenIsValidMiddleware, deleteClientController);

export default clientRoutes;
