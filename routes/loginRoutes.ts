/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import express from "express";
import * as autenticacionController from "../controllers/autenticacion";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/auth/login", autenticacionController.login);
router.post(
  "/auth/registrar",
  isAuthenticated,
  autenticacionController.registrar
);
router.post("/auth/logout", isAuthenticated, autenticacionController.logout);

export { router as loginRouter };
