import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import "./mongo";

const app: Express = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.PRODUCTION_URL || "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

import { tipoRouter } from "./routes/tipoRoutes";
import { eficaciasRouter } from "./routes/eficaciasRoutes";
import { pokemonesRouter } from "./routes/pokemonesRoutes";
import { ataquesRouter } from "./routes/ataquesRoutes";
import { loginRouter } from "./routes/loginRoutes";
import { usuariosRouter } from "./routes/usuariosRoutes";

app.use("/api", tipoRouter);
app.use("/api", eficaciasRouter);
app.use("/api", pokemonesRouter);
app.use("/api", ataquesRouter);
app.use("/api", loginRouter);
app.use("/api", usuariosRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
