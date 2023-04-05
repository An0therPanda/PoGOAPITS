/*
 * Fecha de creación: 23-03-2023
 * Autor: Alfredo Leonelli
 * Contacto: alfredoleonellim@gmail.com
 */
import express from "express";
import * as eficaciasController from "../controllers/eficacias";

const router = express.Router();

router.get("/eficacias/:tipo", eficaciasController.getEficacias);
router.get("/eficacia/:eficacia/:tipo", eficaciasController.getEficacia);

export { router as eficaciasRouter };
