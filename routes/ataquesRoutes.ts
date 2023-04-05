/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import express from "express";
import * as ataquesController from "../controllers/ataques";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.get("/ataquescargados", ataquesController.getAtaquesCargados);
router.get("/ataquesrapidos", ataquesController.getAtaquesRapidos);
router.get("/ataquecargado/:id", ataquesController.getAtaqueCargado);
router.get("/ataquerapido/:id", ataquesController.getAtaqueRapido);
router.patch(
  "/ataquecargado/:id",
  isAuthenticated,
  ataquesController.patchAtaqueCargado
);
router.patch(
  "/ataquerapido/:id",
  isAuthenticated,
  ataquesController.patchAtaqueRapido
);
router.post(
  "/ataquecargado",
  isAuthenticated,
  ataquesController.postAgregarAtaqueCargado
);
router.post(
  "/ataquerapido",
  isAuthenticated,
  ataquesController.postAgregarAtaqueRapido
);

export { router as ataquesRouter };
