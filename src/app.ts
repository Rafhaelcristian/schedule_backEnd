import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import { handleErros } from "./error";
import clientRoutes from "./routes/client.routes";
import contactRoutes from "./routes/contact.routes";
import loginRoutes from "./routes/session.routes";

const app: Application = express();
app.use(express.json());

app.use("/client", clientRoutes);
app.use("/login", loginRoutes);
app.use("/contact", contactRoutes);

app.use(handleErros);

export default app;
