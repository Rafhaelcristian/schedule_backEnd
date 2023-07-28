import { Router } from "express";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { loginSchemaRequest } from "../schemas/session.schema";
import { loginUserController } from "../controllers/session.controller";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureBodyIsValidMiddleware(loginSchemaRequest),
  loginUserController
);

export default loginRoutes;
